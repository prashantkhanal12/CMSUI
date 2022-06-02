import {useEffect} from 'react'
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
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
import * as interestRateRedux from '../../interestRate'
import moment from 'moment'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  loanInterestRateFile: Yup.string().required('Loan file is required'),
  depositInterestRateFile: Yup.string().required('Desposit file is required'),
})

const AddInterestRate = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const {loading, success} = useSelector((state: any) => state.interestRate)

  useEffect(() => {
    dispatch(interestRateRedux.actions.getInterestRate(params))
  }, [params])

  useEffect(() => {
    if (success) {
      dispatch(interestRateRedux?.actions.getInterestRate(params))
      isEmpty(editSelectedData)
        ? toast.success('Interest Rate added successfully')
        : toast.success('Interest Rate edited successfully')
      dispatch(interestRateRedux?.actions.resetInterestRate())
      handleClose()
    }
  }, [success])

  return (
    <div className='modal-container'>
      <Modal open={open} onClose={handleClose} className='w-75' enforceFocus={false}>
        <Modal.Header>
          <Modal.Title>{actionType} Interest Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                date: '',
                loanInterestRateFile: '',
                depositInterestRateFile: '',
                firstSectionInfoText: '',
                secondSectionInfoText: '',
                thirdSectionHeaderOneText: '',
                thirdSectionHeaderTwoText: '',
                thirdSectionBodyOneText: '',
                thirdSectionBodyTwoText: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = new FormData()
                formData.append('date', moment(values?.date).format('YYYY-MM-DD'))
                formData.append('loanInterestRateFile', values.loanInterestRateFile)
                formData.append('depositInterestRateFile', values.depositInterestRateFile)
                formData.append('firstSectionInfoText', values.firstSectionInfoText)
                formData.append('secondSectionInfoText', values.secondSectionInfoText)
                formData.append('thirdSectionHeaderOneText', values.thirdSectionHeaderOneText)
                formData.append('thirdSectionHeaderTwoText', values.thirdSectionHeaderTwoText)
                formData.append('thirdSectionBodyOneText', values.thirdSectionBodyOneText)
                formData.append('thirdSectionBodyTwoText', values.thirdSectionBodyTwoText)
                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    interestRateRedux.actions.updateInterestRate(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(interestRateRedux.actions.addInterestRate(formData))
                }
              }}
            >
              {({
                isSubmitting,
                touched,
                handleChange,
                handleBlur,
                errors,
                values,
                setFieldValue,
              }) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'date',
                      'firstSectionInfoText',
                      'loanInterestRateFile',
                      'depositInterestRateFile',
                      'secondSectionInfoText',
                      'thirdSectionBodyOneText',
                      'thirdSectionBodyTwoText',
                      'thirdSectionHeaderOneText',
                      'thirdSectionHeaderTwoText',
                    ]

                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'date',
                      editSelectedData?.date
                        ? moment(editSelectedData?.date, 'YYYY-MM-DD').toDate()
                        : null,
                      false
                    )
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
                        <FormDatepicker
                          labelClassName='col-12'
                          containerClassName='col-6 '
                          label=' Date'
                          name='date'
                          placeholderText='Please select a date'
                          setFieldValue={setFieldValue}
                          value={values.date || false}
                          touched={touched}
                          required={true}
                          showIcon={true}
                          errors={errors}
                        />
                        <div style={{display: 'flex'}}>
                          <div
                            className='col-md-6 col-sm-6 col-xs-12 mb-2'
                            style={{paddingBottom: '10px'}}
                          >
                            <label className='mb-1 fw-bolder fs-6 required w-100'>
                              Loan Interest Rate File
                            </label>
                            <input
                              type='file'
                              onBlur={handleBlur}
                              //value={values.loanInterestRateFile}
                              name='loanInterestRateFile'
                              onChange={(event) => {
                                setFieldValue('loanInterestRateFile', event.target.files![0])
                              }}
                            ></input>
                            <div className='text-danger fw-bolder small text-end'>
                              <ErrorMessage name='loanInterestRateFile' component='div' />
                            </div>
                          </div>

                          <div
                            className='col-md-6 col-sm-6 col-xs-12 mb-2 '
                            style={{paddingBottom: '10px'}}
                          >
                            <label className='mb-1 fw-bolder fs-6 required w-100'>
                              Deposit Interest Rate File
                            </label>
                            <input
                              type='file'
                              onBlur={handleBlur}
                              //value={values.depositInterestRateFile}
                              name='depositInterestRateFile'
                              onChange={(event) => {
                                setFieldValue('depositInterestRateFile', event.target.files![0])
                              }}
                            ></input>
                            <div className='text-danger fw-bolder small text-end'>
                              <ErrorMessage name='depositInterestRateFile' component='div' />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTinyMce
                            name='firstSectionInfoText'
                            handleChange={handleChange}
                            labelClassName='col-12'
                            label='First Section Info Text (EN)'
                            initialValue={
                              !isEmpty(editSelectedData)
                                ? editSelectedData?.firstSectionInfoText
                                : ''
                            }
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTinyMce
                            name='secondSectionInfoText'
                            handleChange={handleChange}
                            label='Second Section Info Text (NP)'
                            labelClassName='col-12'
                            initialValue={
                              !isEmpty(editSelectedData)
                                ? editSelectedData?.secondSectionInfoText
                                : ''
                            }
                          />
                        </div>

                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Third Section Header One '
                            label='Third Section Header One Text'
                            name='thirdSectionHeaderOneText'
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
                            placeholder='Third Section Header  Two '
                            label='Third Section Header Two Text'
                            name='thirdSectionHeaderTwoText'
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
                            placeholder='Third Section Body One '
                            label='Third Section Body One Text'
                            name='thirdSectionBodyOneText'
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
                            placeholder='Third Section Body Two '
                            label='Third Section Body Two Text'
                            name='thirdSectionBodyTwoText'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='d-flex justify-content-end px-5 '>
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
export default AddInterestRate
