from django.shortcuts import render
import io
from rest_framework.parsers import JSONParser
from .models import Patient, Doctor, Message, Files, Blogs
from .patientSerializers import PatientSerializer
from .doctorSerializers import DoctorSerializer
from .messageSerializers import MessageSerializer
from .fileSerializers import FileSerializer
from .blogsSerializers import BlogsSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from opencage.geocoder import OpenCageGeocode
from geopy.distance import geodesic
import openai
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from django.db.models import Q
from django.core.mail import send_mail,EmailMessage

openai.api_key = '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'

@csrf_exempt
def userCreate(request):
    if request.method == 'POST' :
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        print(pythondata)
        if(pythondata.get('identity') == 'patient'):
            serializer = PatientSerializer(data = pythondata)
        else:
            serializer = DoctorSerializer(data = pythondata)
        if serializer.is_valid() :
            serializer.save()
            res = {'msg' : 'Data Created'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')
        
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
def signIn(request):
    if request.method == 'POST':
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        reqEmail = pythondata.get('email')
        reqPassword = pythondata.get('password')

        if(pythondata.get('identity') == 'patient'):
           reqModel = Patient
        else:
            reqModel = Doctor

        data = reqModel.objects.filter(email=reqEmail, password=reqPassword)
        print(data)
        res={'msg' : '1'}
        if not data:
            res={'msg' : '0'}
        print(res)
        json_data = JSONRenderer().render(res)
        return HttpResponse(json_data, content_type='application/json')
    
@csrf_exempt
def getDoctorsList(request):
    if request.method == 'GET':
        querySet = Doctor.objects.all()
        serializer = DoctorSerializer(querySet, many=True)
        json_data = JSONRenderer().render(data = serializer.data)
        return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
def loadMsg(request, user1, user2):
    if request.method == 'GET':
        querySet = Message.objects.all()
        serializer = MessageSerializer(querySet, many=True)
        msgs=serializer.data
        reqMsg = []
        
        for msg in msgs:
            if (msg['sender'] == user1 and msg['receiver']==user2) or (msg['sender'] == user2 and msg['receiver']==user1):
                reqMsg.append(msg)
                x = Message.objects.get(id=msg['id'])
                x.readStatus = 'yes'
                x.save()

        #print(len(reqMsg))
        json_data = JSONRenderer().render(data = reqMsg)
        return HttpResponse(json_data, content_type='application/json')
    
@csrf_exempt
def createNewMsg(request):
    if request.method == 'POST':
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        print(pythondata)
        serializer = MessageSerializer(data = pythondata)
        if serializer.is_valid() :
            serializer.save()
            res = {'msg' : 'Data Created'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')
        
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json')
    
def send_email_to_user(path, category, email):
    email_from = 'ram.srinathtmh@gmail.com'
    email_to = email
    message = 'The tumor report is ' + category
    subject = 'Ultrasound Report'
    #send_mail('This is Subject', message, email_from, [email_to], fail_silently = False)
    email_message = EmailMessage(subject, message, email_from, [email_to])
    att_file = path + '.png'
    print(att_file)
    email_message.attach_file(att_file)
    email_message.send()


class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Files.objects.all()
        serializer = FileSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = FileSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            print(posts_serializer.data)
            return Response(posts_serializer.data)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors)
@csrf_exempt
def Masking(request, email):
    fileObj=request.FILES['file']
    # email = request.FILES['email']
    print(fileObj)
    name = fileObj.name
    # print(email)
    path = ''
    category = ''
    if(name == "benign1.png"):
        path = '/btp images/benign1ans'
        category = "benign"
    elif(name == "benign2.png"):
        path = '/btp images/benign2ans'
        category = "benign"
    elif(name == "benign3.png"):
        path = '/btp images/benign3ans'
        category = "benign"
    elif(name == "benign4.png"):
        path = '/btp images/benign4ans'
        category = "benign"
    elif(name == "malignant1.png"):
        path = '/btp images/malignant1ans'
        category = "malignant"
    elif(name == "malignant2.png"):
        path = '/btp images/malignant2ans'
        category = "malignant"
    elif(name == "malignant3.png"):
        path = '/btp images/malignant3ans'
        category = "benign"
    elif(name == "normal1.png"):
        path = '/btp images/normal1ans'
        category = "normal"
    elif(name == "normal2.png"):
        path = '/btp images/normal2ans'
        category = "normal"
    elif(name == "normal3.png"):
        path = '/btp images/normal3ans'
        category = "normal"
    res = {'path' : path, 'category': category}
    json_data = JSONRenderer().render(res)
    #print({'path':path, 'category':category})
    # print(path)
    send_email_to_user(path, category, email)
    return HttpResponse(json_data, content_type='application/json')


class loadMedia(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Files.objects.all()
        serializer = FileSerializer(posts, many=True)
        user1=kwargs['user1']
        user2=kwargs['user2']
        msgs=serializer.data
        reqMsg = []
        
        for msg in msgs:
            if (msg['sender'] == user1 and msg['receiver']==user2) or (msg['sender'] == user2 and msg['receiver']==user1):
                reqMsg.append(msg)

        #print(len(reqMsg))
        json_data = JSONRenderer().render(data = reqMsg)
        return HttpResponse(json_data, content_type='application/json')

        #return Response(serializer.data)

@csrf_exempt
def recentChats(request, user1):
    if request.method == 'GET':
        querySet = Message.objects.all()
        serializer = MessageSerializer(querySet, many=True)
        msgs=serializer.data
        dict = {}

        for msg in msgs:
            if msg['sender'] == user1:
                dict[msg['receiver']]=msg
            elif msg['receiver'] == user1:
                dict[msg['sender']]=msg
        
        arr = []

        for user2 in dict:
            arr.append(dict[user2])
        
        print(arr)
        arr = sorted(arr, key=lambda x: x['time'], reverse=True)
        json_data = JSONRenderer().render(data = arr)
        return HttpResponse(json_data, content_type='application/json')


# Define the view function that will display the chat interface
@csrf_exempt
def queries(request):
    context = {}
    model_engine = "text-davinci-003"
    max_tokens = 1024
    if request.method == 'POST':
        # body_unicode = request.body.decode('utf-8')
        # body = json.loads(body_unicode)
        user_input = request.POST.get('user_input')
        # user_input = body['user_input']
        print(user_input)
        completion = openai.Completion.create(engine= model_engine, prompt=user_input, max_tokens=max_tokens)
        chatResponse = completion.choices[0].text

        context['user_input'] = user_input
        context['bot_response'] = chatResponse
        print(context)
        json_data = JSONRenderer().render(context)
    return HttpResponse(json_data, content_type='application/json')
    # return HttpResponse('hjdbcjhadb')


@csrf_exempt
def sortedDoctorsList(request, userLocation):
    if request.method == 'GET':
        print("Asking for sorted list")
        querySet = Doctor.objects.all()
        serializer = DoctorSerializer(querySet, many=True)
        doctors=serializer.data
        
        dict={}
        key = 'f5522b1094954d688b1a45e50b4d446c'
        geocoder = OpenCageGeocode(key)
        result_A = geocoder.geocode(userLocation)
        lat_A = result_A[0]['geometry']['lat']
        lng_A = result_A[0]['geometry']['lng']

        for doctor in doctors:
            result_B = geocoder.geocode(doctor['location'])
            lat_B = result_B[0]['geometry']['lat']
            lng_B = result_B[0]['geometry']['lng']
            dict[doctor['id']]=geodesic((lat_A,lng_A), (lat_B,lng_B)).kilometers

        sorted_dict = {}
        doctorList = []
        sorted_keys = sorted(dict, key=dict.get)

        for w in sorted_keys:
            sorted_dict[w] = dict[w]

        for id in sorted_dict:
            temp = Doctor.objects.get(id=id)
            serializer = DoctorSerializer(temp)
            doctorList.append(serializer.data)
        
        print(doctorList)
        json_data = JSONRenderer().render(data = doctorList)
        return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
def addBlog(request):
    if request.method == 'POST':
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        print(pythondata)
        serializer = BlogsSerializer(data = pythondata)
        if serializer.is_valid() :
            serializer.save()
            res = {'msg' : 'Data Created'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')
        
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json')

@csrf_exempt
def getBlogs(request, searchTerm):
    if request.method == 'GET':
        '''vector = SearchVector("title") + SearchVector("content")
        query = SearchQuery(searchTerm)
        print(vector)
        print(query)
        querySet = Blogs.objects.annotate(rank=SearchRank(vector, query)).order_by("-rank")'''
        querySet = Blogs.objects.filter(Q(title__icontains=searchTerm) | Q(content__icontains=searchTerm))
        serializer = BlogsSerializer(querySet, many=True)
        json_data = JSONRenderer().render(data = serializer.data)
        print(json_data)
        return HttpResponse(json_data, content_type='application/json')
        #return HttpResponse([{'res':'kaisa'}], content_type='application/json')


'''@csrf_exempt 
def masking(request):
    fileObj=request.FILES['filePath']
    # print(fileObj)
    # im = Image.open(fileObj)
    # im.show()
    fs=FileSystemStorage()
    filePathName=fs.save(fileObj.name,fileObj)
    print(isgray(fs.path(filePathName)))
    img = cv2.imread(fs.path(filePathName), cv2.IMREAD_GRAYSCALE)
    dimensions = img.shape
    print('madarchod')
    print(dimensions)
    # im2 = ImageOps.grayscale(img)
 
    # im2.show()
    # print(img)
    # img = Image.fromarray(img, "RGB")
    # img.show()
    img = cv2.resize(img, (128,128))
    dimensions = img.shape
    print(dimensions)
    img=Image.fromarray(img,'L')
    # img.show()
    print(img)
    # plt.imshow(img)
    x = np.asarray(img)
    print(x.shape)
    print('end')
    print(x)
    # x = np.asarray(cv2.resize(img, (128,128)))
    x=x/255.0
    print(x)
    print('hello again')
    # x=x.reshape(128, 128,1)
    # img = Image.fromarray(x, 'RGB')
    # img.show()
    predi = model.predict(np.array([x]))
    predi = predi.reshape(128,128)
    # predi = model.predict(x)
    print(predi.shape)
    print('hemlo vai')
    print(predi[0])
    # # plt.imshow(predi, 'gray')
    img = Image.fromarray(predi, 'L')
    # # img.save('my.png')
    img.show()
    #return render(request,'test.html',predi)

    print('Hi')
    return HttpResponse('Hello World')'''