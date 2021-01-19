import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import { getFirebase } from "../util/firebase-provider";

import './Form.scss'

class Form extends React.Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false,
    submit: false,
    firstname: "",
    lastname: "",
    emailAddress: "",
    phone: "",
    gender: "",
    type: "",
    message: "",
    database: null,
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    if (this.state.disabled) return
    
    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    const { database } = this.state;
    if(database){
      await database.collection('contact').add({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.emailAddress,
        message: this.state.message,
        enquiry: this.state.type,
        gender: this.state.gender
      });
      
      this.setState({
        submit: true,
        alert: this.props.successMessage,
        firstname: "",
        lastname: "",
        emailAddress: "",
        phone: "",
        gender: "",
        type: "",
        message: "",
      });
    }

    // fetch(form.action + '?' + stringify(data), {
    //   method: 'POST'
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       return res
    //     } else {
    //       throw new Error('Network error')
    //     }
    //   })
    //   .then(() => {
    //     form.reset()
    //     this.setState({
    //       alert: this.props.successMessage,
    //       disabled: false
    //     })
    //   })
    //   .catch(err => {
    //     console.error(err)
    //     this.setState({
    //       disabled: false,
    //       alert: this.props.errorMessage
    //     })
    //   })
  }

  componentDidUpdate() {
    const {database} = this.state
    if(!database) {
      const database = getFirebase()
      this.setState({ database: database })
    }
    const { submit } = this.state;
    if (submit) {
      setTimeout(() => {
        this.setState({ submit: !submit });
      }, 4000);
    }

  }
  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" />
        </Helmet>
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify=""
          netlify-recaptcha=""
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Firstname"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleInputChange}
                required
              />
              <span>Firstname</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Lastname"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleInputChange}
                required
              />
              <span>Lastname</span>
            </label>
          </div>
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="male"
                onChange={this.handleInputChange}
                defaultChecked
              />
              <span>Male</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="gender"
                value="female"
                onChange={this.handleInputChange}
              />
              <span>Female</span>
            </label>
          </fieldset>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
              name="emailAddress"
              required
            />
            <span>Email address</span>
          </label>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Type of Enquiry"
              value={this.state.enquiry}
              onChange={this.handleInputChange}
              required
            >
              <option disabled hidden>
                Type of Enquiry
              </option>
              <option>Need to know more</option>
              <option>Found a bug</option>
              <option>Want to say hello</option>
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
              value={this.state.message}
              onChange={this.handleInputChange}
            />
            <span>Message</span>
          </label>
          <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
            />
            <span>Get news updates</span>
          </label>
          <div
            className="g-recaptcha"
            data-sitekey="6Lfjni0aAAAAANeHNnhN8Uqi6e0YIUZuRp5zzsio"
          />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Enquire"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default Form
