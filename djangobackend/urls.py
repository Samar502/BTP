from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Create/', views.userCreate),
    path('SignIn/', views.signIn),
    path('DoctorsList/', views.getDoctorsList),
    path('Sorted Doctors List/<str:userLocation>', views.sortedDoctorsList),
    path('Queries/', views.queries),
    path('Chat/<str:user1>/<str:user2>', views.loadMsg),
    path('createNewMsg/', views.createNewMsg),
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
    path('LoadMedia/<str:user1>/<str:user2>', views.loadMedia.as_view(), name='loadMedia'),
    path('RecentChats/<str:user1>', views.recentChats),
    path('Add Blog/', views.addBlog),
    path('Get Blogs/<str:searchTerm>', views.getBlogs),
    path('Masking/<str:email>', views.Masking),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
