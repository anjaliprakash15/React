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
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
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
      this.props.fetchComments();
      this.props.fetchPromos();
    }
    render(){
      
        return(
            <div>
            <Header/>
            <TransitionGroup>
              <CSSTransition key={this.props.location} classNames="page" timeout={300}>
              
            
                <Routes>
                  
                    <Route exact path="/home" element={ <Home dishes = {this.props.dishes.dishes} 
                                                leaders = {this.props.leaders} 
                                                promotions = {this.props.promotions.promotions}
                                                promosLoading = {this.props.promotions.isLoading}
                                                promosErrMess = {this.props.promotions.errMess}
                                                dishesLoading = {this.props.dishes.isLoading}
                                                dishesErrMess = {this.props.dishes.errMess} /> } />
                    <Route path="*" element={<Home dishes = {this.props.dishes.dishes} 
                                                leaders = {this.props.leaders} 
                                                promotions = {this.props.promotions.promotions}
                                                promosLoading = {this.props.promotions.isLoading}
                                                promosErrMess = {this.props.promotions.errMess}
                                                dishesLoading = {this.props.dishes.isLoading}
                                                dishesErrMess = {this.props.dishes.errMess} /> } />
                    <Route exact path='/menu' element={ <Menu dishes={this.props.dishes.dishes}
                                                            dishesLoading = {this.props.dishes.isLoading}
                                                            dishesErrMess = {this.props.dishes.errMess} /> } />

                    <Route exact path='/aboutus' element={ <About leaders={this.props.leaders} /> } />

                    <Route path='/menu/:dishId' element={ <DishDetail dishes ={this.props.dishes.dishes} 
                                                                  postComment={this.props.postComment} 
                                                                  comments={this.props.comments.comments}
                                                                  commentsErrMess = {this.props.comments.errMess}
                                                                  dishesLoading = {this.props.dishes.isLoading}
                                                                  dishesErrMess = {this.props.dishes.errMess} /> } />
                    <Route exact path='/contactus' element={ <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/> } />
                  
                </Routes>

              </CSSTransition>
              
            </TransitionGroup>
            <Footer/>
            </div>
        )
    };

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));