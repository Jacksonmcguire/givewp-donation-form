import { useForm } from "react-hook-form"
import { useState } from "react"
import { useBlockProps, RichText } from '@wordpress/block-editor';


export const DonationForm = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [ currentStep, setCurrentStep ] = useState(1)
  const onSubmit = data => {
    setCurrentStep(3)
    console.log(data)
    }
  console.log(props)
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything

  const nextStep = async () => {
    console.log("hello", watchAllFields, errors)
    if (watchAllFields.firstName !== "" && watchAllFields.lastName !== "" && watchAllFields.email !== "" ) {
      setCurrentStep(2)
    }
  }
  
  const stepTwo = () => {
    return <article className="step-two">
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("cardNumber", { required: true, maxLength: 16, minLength: 16})} placeholder="Card Number"/>
        {errors.cardNumber && <span>Card number is required and should be 16 digits long</span>}
        <input {...register("expDate", {required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/})} placeholder="Expiration Date MM/YY"/>
        {errors.expDate && <span>Expiration date doesn't match the {errors.expDate.type}</span>}
        <input {...register("CVV", {required: true, maxLength: 3, minLength: 3})} placeholder="CVV"/>
        {errors.CVV && <span>CVV is a 3 digit number</span>}
        <label htmlFor="AnonDonation">Would you like to make this donation Anonymously?</label>
        <input {...register("anonDonation")} type="checkbox" id="AnonDonation"/>

        <button type="submit">Submit Form</button>
      </article>
  }
  if (currentStep !== 3) {

    return (
      <form className="donation-form" onSubmit={handleSubmit(onSubmit)}>
        <article className="step-one">
          <input placeholder="First Name" {...register("firstName", { required: true })} />
          {errors.firstName && <span>First Name is required</span>}
          <input placeholder="Last Name" {...register("lastName", { required: true })}/>
          {errors.lastName && <span>Last Name is required</span>}
          <input {...register("email", { required: true })} type="email" placeholder="email"/>
          {errors.email && <span>Email is required</span>}
          {currentStep === 1 && <button onClick={() => nextStep()}>Move On</button>}
        </article>
        {currentStep === 2 && stepTwo()}
        
      </form>
    )
  }
  else if (currentStep === 3) {
    return <div className="submitted-form"> 
      {console.log(watchAllFields)}
      <p>Thanks for your support {watchAllFields.firstName + ' ' + watchAllFields.lastName}!</p>
      <p>Your donation to X has succesfully been proccessed using the Card ending in xxx{watchAllFields.cardNumber.substr(12)} that expires on {watchAllFields.expDate}</p>
      <p>You can expect to receive a confirmation email at {watchAllFields.email} shortly.</p>
      <p></p>

    </div>
  }
}