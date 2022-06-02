import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import * as Yup from 'yup'

//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import * as functionalAreaRedux from '../../FunctionalArera/redux'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  nameNp: Yup.string().required('Name in nepali is required'),
  Description: Yup.string().required('Description Image is required'),
})

const AddFunctionalArea = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.functionalArea)

  useEffect(() => {
    if (success) {
      dispatch(functionalAreaRedux?.actions.getFunctionalArea(params))
      isEmpty(editSelectedData)
        ? toast.success('Functional Area added successfully')
        : toast.success('Functional Area edited successfully')
      dispatch(functionalAreaRedux?.actions.resetFunctionalArea())
      handleClose()
    }
  }, [success])
  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]
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
          <Modal.Title>{actionType} Functional Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                nameNp: '',
                description: '',
                descriptionNp: '',
                status: '',
              }}
              // validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    functionalAreaRedux.actions.updateFunctionalArea(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(functionalAreaRedux.actions.addFunctionalArea(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'name',
                      'nameNp',
                      'description',
                      'descriptionNp',
                      'status',
                    ]

                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'status',
                      editSelectedData?.status === true ? 'Active' : 'Inactive',
                      false
                    )
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Name'
                            label='Name (EN)'
                            name='name'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Name (NP)'
                            label='Name (NP)'
                            name='nameNp'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            name='description'
                            handleChange={handleChange}
                            label='Album Description (EN)'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                            }
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            name='descriptionNp'
                            handleChange={handleChange}
                            label=' Album Description (NP)'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''
                            }
                          />
                        </div>
                        <label className='form-label fw-bolder text-dark fs-6 required'>
                          Status
                        </label>
                        <div className='d-flex ms-5'>
                          {statusOptions?.map((status: {label: string; value: string}) => (
                            <FormRadio
                              containerClassName=''
                              label='Select Status'
                              name='status'
                              type='radio'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              checkBoxText={status?.label}
                              value={status?.value}
                              required={true}
                            />
                          ))}
                        </div>
                        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
                          <ErrorMessage
                            name='status'
                            component='div'
                            className='field-error-message'
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
export default AddFunctionalArea
