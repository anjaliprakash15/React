import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import { addComment,fetchDishes } from '../redux/ActionCreators';

// Creating a WithRouter with new functions as it is not supported in latest React Router Dom
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

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
})

const mapStateToProps = (state) => {
    return{
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
        comments: state.comments
    }
}
class Main extends Component{
    constructor(props){
      super(props);
    }
    componentDidMount() {
      this.props.fetchDishes();
    }
    render(){
        return(
            <div>
            <Header/>
            <Routes>
                <Route exact path="/home" element={ <Home dishes = {this.props.dishes.dishes} 
                                               leaders = {this.props.leaders} 
                                               promotions = {this.props.promotions}
                                               dishesLoading = {this.props.dishes.isLoading}
                                               dishesErrMess = {this.props.dishes.errMess} /> } />
                <Route path="*" element={<Home dishes = {this.props.dishes.dishes} 
                                               leaders = {this.props.leaders} 
                                               promotions = {this.props.promotions}
                                               dishesLoading = {this.props.dishes.isLoading}
                                               dishesErrMess = {this.props.dishes.errMess} /> } />
                <Route exact path='/menu' element={ <Menu dishes={this.props.dishes.dishes}
                                                          dishesLoading = {this.props.dishes.isLoading}
                                                          dishesErrMess = {this.props.dishes.errMess} /> } />

                <Route exact path='/aboutus' element={ <About leaders={this.props.leaders} /> } />

                <Route path='/menu/:dishId' element={ <DishDetail dishes ={this.props.dishes.dishes} 
                                                                 addComment={this.props.addComment}  
                                                                 comments={this.props.comments}
                                                                 dishesLoading = {this.props.dishes.isLoading}
                                                                 dishesErrMess = {this.props.dishes.errMess} /> } />
                <Route exact path='/contactus' element={ <Contact/> } />
            </Routes>
            <Footer/>
            </div>
        )
    };

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));