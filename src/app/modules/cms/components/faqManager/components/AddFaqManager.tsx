import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {FieldArray, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import * as Yup from 'yup'

//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as faqManagerRedux from '../../faqManager/redux'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
  faqCategoryId?: string
}

const AddFaqManager = ({
  open,
  params,
  handleClose,
  actionType,
  editSelectedData,
  faqCategoryId,
}: Props) => {
  const dispatch = useDispatch()

  const {loading, success} = useSelector((state: any) => state.faqManager)

  useEffect(() => {
    if (success) {
      dispatch(faqManagerRedux?.actions.getFaqManager(params, faqCategoryId))
      isEmpty(editSelectedData)
        ? toast.success('Faq Manager  added successfully')
        : toast.success('Faq Manager edited successfully')
      dispatch(faqManagerRedux?.actions.createFaqManagerReset())
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
          <Modal.Title>{actionType} Faq Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                faqCategoryId: faqCategoryId,
                faq_qna: [
                  {
                    question: '',
                    question_np: '',
                    answer: '',
                    answer_np: '',
                  },
                ],
              }}
              onSubmit={(values, {setSubmitting}) => {
                const formData: any = {
                  ...values,
                }
                dispatch(faqManagerRedux.actions.CreateFaqManger(formData))
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData.faq_qna)) {
                    const fields = ['faq_qna']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])

                return (
                  <Form>
                    <div style={{paddingBottom: '10px'}}>
                      <FieldArray
                        name='faq_qna'
                        render={(arrayHelpers) => (
                          <div>
                            {values.faq_qna && values.faq_qna.length > 0
                              ? values.faq_qna.map((friend: any, index: any) => (
                                  <div className='row' key={index}>
                                    <div className='col-md-6 col-sm-6 col-xs-12'>
                                      <FormTextBox
                                        type='text'
                                        labelClassName='col-md-12'
                                        containerClassName='col-md-12'
                                        placeholder='Enter Question'
                                        label='Question (EN)'
                                        name={`faq_qna.${index}.question`}
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
                                        placeholder='Enter Question Nepali'
                                        label='Question (NP)'
                                        name={`faq_qna.${index}.question_np`}
                                        onChange={handleChange}
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>

                                    <div className='col-md-6 col-sm-6 col-xs-12'>
                                      <FormTinyMce
                                        name={`faq_qna.${index}.answer`}
                                        handleChange={handleChange}
                                        label='Answer (EN)'
                                        initialValue={
                                          editSelectedData?.faq_qna[index]?.answer !== undefined
                                            ? editSelectedData.faq_qna[index].answer
                                            : ''
                                        }
                                      />
                                    </div>
                                    <div className='col-md-6 col-sm-6 col-xs-12'>
                                      <FormTinyMce
                                        name={`faq_qna.${index}.answer_np`}
                                        handleChange={handleChange}
                                        label='Answer (NP)'
                                        initialValue={
                                          editSelectedData?.faq_qna[index]?.answer_np !== undefined
                                            ? editSelectedData.faq_qna[index].answer_np
                                            : ''
                                        }
                                      />
                                    </div>
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
                            <div className='d-flex justify-content-end'>
                              <button
                                className=' p-2 ps-3 pe-3 btn btn-primary w-100'
                                type='button'
                                onClick={() =>
                                  arrayHelpers.push({
                                    id: null,
                                    question: '',
                                    question_np: '',
                                    answer: '',
                                    answer_np: '',
                                  })
                                }
                              >
                                + Add More
                              </button>
                            </div>
                          </div>
                        )}
                      />
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
export default AddFaqManager
