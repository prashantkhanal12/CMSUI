import {ErrorMessage, Form, Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import {useEffect, useState} from 'react'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
//manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as qualificationRedux from 'src/app/modules/CarrierSetting/components/Qualification/redux'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

// const FORM_VALIDATION = Yup.object().shape({
//   name: Yup.string()
//     .required('This field is required')
//     .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
//   image: Yup.string().required('This field is required'),
//   status: Yup.string().required('Status is required'),
// })

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}
const AddQualification = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.Qualification)

  useEffect(() => {
    if (success) {
      dispatch(qualificationRedux?.actions.getQualification(params))
      isEmpty(editSelectedData)
        ? toast.success('Qualification added successfully')
        : toast.success('Qualification edited successfully')
      dispatch(qualificationRedux?.actions.addQualificationReset())
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
        size='lg'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Qualification </Modal.Title>
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
              onSubmit={(values: any) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    qualificationRedux.actions.updateQualification(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(qualificationRedux.actions.addQualification(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['name', 'nameNp', 'description', 'descriptionNp']
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
                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Name'
                            name='name'
                            label='Name (EN)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Name in Nepali'
                            name='nameNp'
                            label='Name (NP)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description (EN)'
                            name='description'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description (NP)'
                            name='descriptionNp'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                      </div>
                      <label className='form-label fw-bolder text-dark fs-6 required'>Status</label>

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
export default AddQualification
