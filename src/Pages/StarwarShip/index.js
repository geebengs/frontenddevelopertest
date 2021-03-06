import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Starship from '../../_components/Starship';
import {starshipsActions} from '../../_actions';

function StarwarShips() {
  const starships = useSelector(state => state.starships);
  const {starshipsList, IsSearchingStarship} = starships;
  const dispatch =  useDispatch();
  
  const handlePreviousPage = () => {
    const { previous} = starships && starships.pagination; 
    const model = {
      page: previous
    }
    
    dispatch(starshipsActions.getStarships(model));
  }

  const handleNextPage = () => {
    const { next} = starships && starships.pagination; 
    const model = {
      page: next
    }
    
    dispatch(starshipsActions.getStarships(model));
  }
  
  const { count, next, previous} = starships && starships.pagination; 

  return (
    <section id="starships" class="starships section-bg">
      <div class="container">
        <header class="section-header">
          <h2>Popular Starships</h2>
        </header>
        <div class="row">
          {
            IsSearchingStarship &&
            <div class="loader"></div>
          }
          {
            starshipsList.length > 0 ? starshipsList.map((row) => {
              return(    
                <div class="col-lg-4 col-md-6 col-sm-12">       
                <Starship row={row} />   
                </div>          
              );
            }) 
            :
            null
          } 
        </div>
      </div>     
      <div class="pagination">
        <p class='number'>1 - 10 of {count}</p>
        <a disable={previous === null} onClick={handlePreviousPage}>❮</a>
        <a disable={next === null} onClick={handleNextPage}>❯</a>
      </div>      
    </section>
  )
}

export default StarwarShips;