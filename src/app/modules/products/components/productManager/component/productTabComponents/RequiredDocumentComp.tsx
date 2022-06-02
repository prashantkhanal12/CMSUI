import {FieldArray, FormikErrors} from 'formik'
import {cloneDeep, isEmpty} from 'lodash'
import {ChangeEvent, useEffect} from 'react'
import * as Yup from 'yup'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  editSelectedData: {[key: string]: string} | any
  documentOptions: FormOptionModal[]
  validationState: any
  setValidationState: any
  optionName: string
  setFieldValue: any
}

export function RequiredDocumentsComponent({
  handleChange,
  errors,
  touched,
  values,
  editSelectedData,
  documentOptions,
  validationState,
  setValidationState,
  optionName,
  setFieldValue,
}: Props) {
  const showDocumentId = documentOptions?.find(
    (item: FormOptionModal) => item.value === values[`${optionName}`]
  )


  useEffect(() => {
    if (!isEmpty(showDocumentId) && showDocumentId?.systemName === 'yes') {
      setValidationState({
        ...validationState,
        documentData: Yup.object().shape({
          title: Yup.string().required('Document title is required').nullable(),
        }),
      })
    } else if (!isEmpty(showDocumentId) && showDocumentId?.systemName === 'no') {
      let newValidationSchema = cloneDeep(validationState)
      !isEmpty(newValidationSchema['documentData']) && delete newValidationSchema['documentData']
      setValidationState(newValidationSchema)
    }
  }, [values?.showDocumentId])

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Required Documents Section'
              name={optionName}
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={documentOptions}
              values={values}
              setFieldValue={setFieldValue}
              required
            />
          </div>
        </div>
        {showDocumentId?.systemName === 'yes' ? (
          <>
            <div className='row'>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Required Documents Section Title (EN)'
                  name={`documentData.title`}
                  label='Required Documents Section Title (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={showDocumentId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Required Documents Section Title (NP)'
                  name={`documentData.titleNp`}
                  label='Required Documents Section Title (NP)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </div>

              <div className='col-md-6 col-xs-12'>
                <FormTinyMce
                  containerClassName='col-md-12'
                  labelClassName='col-md-12'
                  label='Required Documents Section Description (EN)'
                  name={`documentData.description`}
                  initialValue={
                    !isEmpty(editSelectedData) ? editSelectedData?.documentData?.description : ''
                  }
                  handleChange={handleChange}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTinyMce
                  containerClassName='col-md-12'
                  labelClassName='col-md-12'
                  label='Required Documents Section Description (NP)'
                  name={`documentData.descriptionNp`}
                  initialValue={
                    !isEmpty(editSelectedData) ? editSelectedData?.documentData?.descriptionNp : ''
                  }
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className='row'>
              <span
                className='bg-danger pt-3 pb-3 fs-4 mb-5 mt-5'
                style={{textDecoration: 'bolder', color: 'white'}}
              >
                Please enter at least one Required Document
              </span>
            </div>
            <div className='row'>
              <FieldArray
                name='documents'
                render={(arrayHelpers) => (
                  <div>
                    {values.documents && values.documents.length > 0
                      ? values.documents.map((friend: any, index: any) => (
                          <div className='row mb-4' key={index}>
                            <div className='col-md-6 col-xs-12'>
                              <FormTinyMce
                                containerClassName='col-md-12'
                                labelClassName='col-md-12'
                                label='Description (EN)'
                                name={`documents.${index}.description`}
                                initialValue={
                                  !isEmpty(editSelectedData)
                                    ? editSelectedData?.documents[index]?.description
                                    : ''
                                }
                                handleChange={handleChange}
                              />
                            </div>
                            <div className='col-md-6 col-xs-12'>
                              <FormTinyMce
                                containerClassName='col-md-12'
                                labelClassName='col-md-12'
                                label='Description (NP)'
                                name={`documents.${index}.descriptionNp`}
                                initialValue={
                                  !isEmpty(editSelectedData)
                                    ? editSelectedData?.documents[index]?.descriptionNp
                                    : ''
                                }
                                handleChange={handleChange}
                              />
                            </div>
                            <div className='col-md-6 col-sm-6 col-xs-12'></div>

                            {index > 0 && (
                              <div className='col-md-6 col-sm-6 col-xs-12 justify-content-md-end text-end mb-2'>
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
                        className='p-2 ps-5 pe-5 mt-5 btn btn-primary'
                        type='button'
                        onClick={() =>
                          arrayHelpers.push({
                            description: '',
                            descriptionNp: '',
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
          </>
        ) : null}
      </div>
    </>
  )
}
