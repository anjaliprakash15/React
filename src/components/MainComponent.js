import React, { Component, useEffect} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

class Main extends Component{
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
  
    };

  }
  
  render() {

    const HomePage=()=>{
      return(
        <Home
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}

        />
      );
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail 
                dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
      );
    };
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/home' element={<HomePage/>} />
          <Route exact path='/menu' element={<Menu dishes={this.state.dishes} /> }/>
          <Route path='/menu/:dishId' element={<DishDetail dishes ={this.state.dishes} comments={this.state.comments}/>} />
          <Route exact path='/contactus' element={<Contact/>} />
          <Route path="*" element = {<Navigate to ="/home" />} />
        </Routes>
        
        <Footer />
      </div>
    );
  }
}

export default Main;
