import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function FeaturedPost(props) {
  const { post, user1 } = props;
  var to='/Patient Chats/:'+user1+'/:'+post.email;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={to}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.firstName} {post.lastName}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.employment}
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{marginTop:'-20px'}}>
              {post.location}
            </Typography>
            <Typography variant="subtitle1" color="primary" sx={{marginTop:'-10px'}}>
              {post.email}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image="https://img.freepik.com/premium-vector/doctor-icon-avatar-white_136162-58.jpg?w=2000"
          />
        </Card>
      </CardActionArea>
    </Grid>
    
  );
}

{/*FeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}; */}

export default FeaturedPost;