import React, { Component }from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row, Col, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen : false
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);


	}
	toggleModal() {
		this.setState({
      		isModalOpen: !this.state.isModalOpen
  		});
	}
	handleSubmit(values) {
		this.toggleModal();
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        
    }
	render() {
		return(
			<div className = "container">
				<div className = "col-12 col-md-5 m-1">
					<Button outline onClick={this.toggleModal} >
						<span className="fa fa-pencil fa-lg"></span> Submit Comment
					</Button>

					<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            			<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            			<ModalBody>
            				<div className="col-12 m-1">
            					<LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
            						<Row className="form-group">
            							<Label htmlFor="rating">Rating</Label>
            							<Col md={12}>
            								<Control.select model=".rating" name="rating" className="form-control">
            									<option>1</option>
            									<option>2</option>
            									<option>3</option>
            									<option>4</option>
            									<option>5</option>
            							    </Control.select>
            							 </Col>
            						</Row>
            						<Row className="form-group">
            							<Label htmlFor="author">Your Name</Label>
            							<Col md={12}>
            								<Control.text model=".author" id="author" name="author"
            									placeholder="Your Name"
            									className="form-control"
            									validators={{
                                            		required, minLength: minLength(3), maxLength: maxLength(15)
                                        		}}
            								      />
            								<Errors
                                        		className="text-danger"
                                        		model=".author"
                                        		show="touched"
                                        		messages={{
                                            		required: 'Required',
                                            		minLength: 'Must be greater than 2 characters',
                                            		maxLength: 'Must be 15 characters or less'
                                        		}}
                                     		/>
            							</Col>
            						</Row>
            						<Row className="form-group">
            							<Label htmlFor="comment">Comment</Label>
            							<Col md={12}>
            								<Control.textarea model=".comment" id="comment" name="comment"
                                        		rows="6"
                                        		className="form-control"
                                        	 />
                                        </Col>
            						</Row>
            						<Row className="form-group">
                                		<Col md={12}>
                                    		<Button type="submit" color="primary">
                                    			Submit
                                    		</Button>
                                		</Col>
                            		</Row>
            					</LocalForm>
            				</div>
            			</ModalBody>
            	    </Modal>
				</div>
			</div>


		);
	}
}

function RenderDish({dish}) {
	
        return(
        	<div>
        	<FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
          		<Card>
            		<CardImg width="/100%" src={baseUrl + dish.image} alt={dish.name} />
            		<CardBody>
              			<CardTitle>{dish.name}</CardTitle>
              			<CardText>{dish.description}</CardText>
            		</CardBody>
          		</Card>
          	</FadeTransform>
        	</div>
        );
 }

function RenderComments({comments}){
    		return(
    		    <div>
    		       <h4> Comments </h4>
    		       <ul className="list-unstyled">
    		       <Stagger in>
    		       		{comments.map((comment)=>{
    		       	   		return(
    		       	   			<Fade in>
    		       	        		<li key={comment.id}>
    		       	           		<p>{comment.comment}</p>
    		       	           		<p>-- {comment.author} , {new Intl.DateTimeFormat('en-Us', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
    		       	        		</li>
    		       	        	</Fade>
    		       	    	);
    		       		})}

    		       	</Stagger>
    		       	</ul>
  		       
   		       			
    		    </div>
    		); 	
         
 }
	const DishDetail = (props)=> {
		let {dishId}=useParams();
		console.log(dishId)
		const dish=props.dishes.filter((dish)=>dish.id==dishId)[0]
		const comment=props.comments.filter((comment)=>comment.dishId==dishId)
		///console.log(dish)
		///const addComment=props.addComment

		if (props.dishesLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishesErrMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.dishesErrMess}</h4>
                    </div>
                </div>
            );
        }
		
	    else if (dish !=null) {
			return (
				<div className = "container">
				 	<div className="row">
              			<Breadcrumb>
                   			
                   			<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                   			<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
              			</Breadcrumb>
              			<div className="col-12">
                  			<h3>{dish.name}</h3>
                  			<hr />
              			</div>
          			</div>
				    <div className = "row">
				    	<div className="col-12 col-md m-1">
				       		<RenderDish dish={dish} />
				       	</div>
				       <div className="col-12 col-md m-1">
                            <RenderComments comments={comment} 
                              postComment={props.postComment}
                              dishId={dish.id}
                              />
                            <CommentForm dishId={dishId} postComment={props.postComment} />                           	
                            
                        </div>                 
                    </div>
                </div>
			);
		}
		else{
			return(
				<div></div>
			);
		}
	}

   
export default DishDetail;