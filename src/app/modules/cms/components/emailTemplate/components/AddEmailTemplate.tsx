import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {FieldArray, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import * as Yup from 'yup'

//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import * as emailTemplateRedux from '../../emailTemplate/redux'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  templateName: Yup.string().required('Title is required'),
  //adminEmail: Yup.string().email('Invalid email'),
  adminEmail: Yup.array().of(
    Yup.object().shape({
      adminEmail: Yup.string()
        .email('Invalid email')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid Email'),
    })
  ),
})

const AddEmailTemplate = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const {loading, success} = useSelector((state: any) => state.emailTemplate)

  useEffect(() => {
    if (success) {
      dispatch(emailTemplateRedux?.actions.getEmailTemplate(params))
      isEmpty(editSelectedData)
        ? toast.success('Email Template added successfully')
        : toast.success('Email Template Edited successfully')
      dispatch(emailTemplateRedux?.actions.resetEmailTemplate())
      handleClose()
    }
  }, [success])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        className='w-75'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Email Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                templateName: '',
                adminSubject: '',
                userSubject: '',
                adminMessage: '',
                userMessage: '',
                adminEmail: [''],
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,

                  adminEmail: values?.adminEmail?.map((email: string) => email),
                  /* adminEmail: values?.adminEmail?.map((adminEmail: any) => ({
                    adminEmail: adminEmail,
                  })), */
                  /*  adminEmail: values?.adminEmail?.map((item: {[key: string]:string }) => ({
                    ...item,
                    id: !isEmpty(editSelectedData) ? item.id : null,
                  })), */
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    emailTemplateRedux.actions.updateEmailTemplate(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(emailTemplateRedux.actions.addEmailTemplate(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'templateName',
                      'adminSubject',
                      'userSubject',
                      'adminMessage',
                      'userMessage',
                      'adminEmail',
                    ]

                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Template Name'
                            label='Template Name'
                            name='templateName'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        {/*  <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Admin Email '
                            label='Admin Email '
                            name='adminEmail'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div> */}

                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FieldArray
                            name='adminEmail'
                            render={(arrayHelpers) => (
                              <div>
                                {values.adminEmail && values.adminEmail.length > 0
                                  ? values.adminEmail.map((friend: any, index: any) => (
                                      <div key={index}>
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Admin E-mail'
                                          label='Admin Email'
                                          name={`adminEmail.${index}.adminEmail`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                        />

                                        {index > 0 && (
                                          <div className='col-md-12  justify-content-md-end text-end mb-2'>
                                            <button
                                              type='button'
                                              className='p-2 ps-5 pe-5 btn btn-secondary'
                                              onClick={() => arrayHelpers.remove(index)}
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  : null}
                                <div className=' d-flex justify-content-md-end mb-2 border-top border-light'>
                                  <button
                                    className='p-2 ps-5 pe-5 btn btn-primary'
                                    type='button'
                                    onClick={() => arrayHelpers.push({adminEmail: ''})}
                                  >
                                    + Add More
                                  </button>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Admin Subject'
                            label='Admin Subject'
                            name='adminSubject'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter User Subject'
                            label='User Subject '
                            name='userSubject'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTinyMce
                            name='adminMessage'
                            handleChange={handleChange}
                            label='Admin Message'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.adminMessage : ''
                            }
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTinyMce
                            name='userMessage'
                            handleChange={handleChange}
                            label=' User Message '
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.userMessage : ''
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className='d-flex justify-content-end px-9 '>
                      <button
                        type='submit'
                        disabled={loading}
                        className='btn btn-primary btn-sm ms-3'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={handleClose}
                        className='btn btn-secondary btn-sm ms-3'
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AddEmailTemplate
