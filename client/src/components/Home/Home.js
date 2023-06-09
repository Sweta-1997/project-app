import React, { useState , useEffect } from 'react';
import {Grid,Grow,Container,Paper,AppBar,TextField,Button} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts,getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination';
import useStyles from './styles';



function useQuery() {
    return new URLSearchParams(useLocation().search);   
}

const Home = () =>{

    const [currentId, setCurrentId] = useState(0);
    const [search,setSearch] = useState('');
   const [tags,setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const searchPost = () =>{
    if(search.trim() || tags){
        dispatch(getPostsBySearch({ search , tags: tags.join(',')}))
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)

    }
    else{
        history.push('/');
    }
  }

  const handleKeyPress = (e) =>{

    if(e.keyCode === 13){
      searchPost();
    }


  };

  const handleAdd = (tag) => setTags([ ...tags, tag]);

  const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete ));


    return(
<Grow in>
        <Container maxWidth = "xl">
          <Grid container justify="space-between" alignItems="stretch" spacing={3} className = {classes.gridContainer}>
            <Grid item xs={12} sm={7} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
          
            <Grid item xs={12} sm={5} md={3}>
                <AppBar className = {classes.appBarSearch} position = "static" color="inherit">
                    <TextField name="search"
                     variant="outlined" 
                     label="Search Mementos"
                     onKeyPress={handleKeyPress}
                     fullWidth
                     value={search}
                     onChange = {(e) => setSearch(e.target.value)}
                     />
                     <ChipInput
                     style = {{margin: '10px 0'}}
                     value = {tags}
                     onAdd = {handleAdd}
                     onDelete = {handleDelete}
                     label = "Search Tags"
                     variant = "outlined"
                     />
                     <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              
            </Grid>
            <Grid item xs={12} sm={7} md={9}>
              
                 <Paginate page={page}/> 
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;