import {useEffect} from 'react'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import {StateParamsModel} from 'src/app/modules/common/Model'
import * as branch from '../../branch'
import * as managerRedux from '../'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {BranchModel} from '../../branch/Model/BranchModel'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  branchId: Yup.string().required('Branch is required'),
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  email: Yup.string()
    .email('Invalid Email. Eg: example@xyz.com')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please provide valid email'),
  managerPhone: Yup.string()
    .matches(/^(98|97)([0-9]{8})$/, 'Enter valid phone number')
    .max(10, 'Mobile number exceeds 10 digits'),
  phone: Yup.string()
    .matches(/^[0-9][0-9]*$/, 'Must contain only number')
    .max(10, 'Phone exceeds 10 digits'),
  status: Yup.string().required('Status is required'),
})

const AddBranchManager = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {data} = useSelector((state: any) => state.branch)
  const {success, loading} = useSelector((state: any) => state.manager)

  useEffect(() => {
    dispatch(branch?.actions.getAllBranchList())
  }, [])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const branchOptions = data?.branch?.map((items: BranchModel) => ({
    label: items.title,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(managerRedux?.actions.getBranchManagerData(params))
      isEmpty(editSelectedData)
        ? toast.success('Branch Manager added successfully')
        : toast.success('Branch Manager edited successfully')
      dispatch(managerRedux?.actions?.resetBranchManager())
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
          <Modal.Title>{actionType} Branch Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                branchId: '',
                name: '',
                status: '',
                managerPhone: '',
                phone: '',
                hideInWebsite: false,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(managerRedux.actions.updateBranchManager(formData, editSelectedData?.id))
                } else {
                  dispatch(managerRedux.actions.addBranchManager(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['managerPhone', 'email', 'id', 'phone', 'name', 'nameNp']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('branchId', editSelectedData?.branch?.id, false)
                    setFieldValue('hideInWebsite', editSelectedData?.hideInWebsite, false)
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
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Branch'
                            name='branchId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={branchOptions}
                            required
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Branch Manager Name'
                            label='Branch Manager Name (EN)'
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
                            placeholder='Enter Branch Manager Name (NP)'
                            label='Branch Manager Name (NP)'
                            name='nameNp'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter E-mail'
                            label='E-mail'
                            name='email'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Phone Number'
                            label='Manager Phone Number'
                            name='managerPhone'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                          <div className='d-flex justify-content-end'>
                            <em>
                              <small className='d-block'>
                                <span className='text-danger'>Note: </span> Mobile number should
                                starts with 98|97
                              </small>
                            </em>
                          </div>
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Telephone'
                            label='Telephone'
                            name='phone'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
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
                                required={true}
                                checkBoxText={status?.label}
                                value={status?.value}
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
                        <div className='col-md-6 col-sm-12 col-xs-12'>
                          <div className='row pt-5'>
                            <FormCheckbox
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              label='Hide in Website'
                              name='hideInWebsite'
                              touched={touched}
                              errors={errors}
                              onChange={handleChange}
                              checkBoxText='Hide in website'
                            />
                          </div>
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
export default AddBranchManager
