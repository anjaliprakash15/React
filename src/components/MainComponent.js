import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }

    return ComponentWithRouterProp;
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component{
  constructor(props) {
    super(props);

    

  }

  
  render() {

    const HomePage=()=>{
      return(
        <Home
            dish={this.props.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}

        />
      );
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail 
                dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
      );
    };
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/home' element={<HomePage/>} />
          <Route exact path='/menu' element={<Menu dishes={this.props.dishes} /> }/>
          <Route path='/menu/:dishId' element={<DishDetail dishes ={this.props.dishes} comments={this.state.comments}/>} />
          <Route exact path='/contactus' element={<Contact/>} />
          <Route exact path='/aboutus' element={<About leaders = {this.props.leaders} /> } />
          <Route path="*" element = {<Navigate to ="/home" />} />

        </Routes>
        
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
