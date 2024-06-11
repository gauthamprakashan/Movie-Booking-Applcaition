import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

const MovieItem = ({title,releaseDate,posterUrl,id}) => {
    
  return (
    <Card sx={{ borderSpacing:10, margin:2, width: 230,height:350,borderRadius:20 }}>
    
    
    <img height={"50%"} width="100%" src={posterUrl} alt={title}/>
    <CardContent>

      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {new Date(releaseDate).toDateString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
          variant="contained"
          fullWidth 
          LinkComponent={Link}
          to={`/booking/${id}`}
          sx={{
            margin: "auto",
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
          }}
          size="small"
        >
          Book
        </Button>
    </CardActions>
  </Card>
  )
}

export default MovieItem