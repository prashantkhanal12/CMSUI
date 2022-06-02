import {ErrorMessage, FieldArray, FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import {ChangeEvent} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {ProductOptionModel} from '../../Model'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  editSelectedData: {[key: string]: string} | any
}

export function AdditionalSection({
  handleChange,
  errors,
  touched,
  values,
  editSelectedData,
}: Props) {
  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='row'>
            <FieldArray
              name='additionalData'
              render={(arrayHelpers) => (
                <div>
                  {values.additionalData && values.additionalData.length > 0
                    ? values.additionalData.map((friend: any, index: any) => (
                        <div className='row mb-4' key={index}>
                          <div className='col-md-6 col-xs-12'>
                            <FormTextBox
                              type='text'
                              placeholder='Enter Text (EN)'
                              name={`additionalData[${index}].text`}
                              label='Text (EN)'
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                          <div className='col-md-6 col-xs-12'>
                            <FormTextBox
                              type='text'
                              placeholder='Enter Text (NP)'
                              name={`additionalData[${index}].textNp`}
                              label='Text (NP)'
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
                              label='Description (EN)'
                              name={`additionalData.${index}.description`}
                              initialValue={
                                !isEmpty(editSelectedData)
                                  ? editSelectedData?.additionalData[index]?.description
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
                              name={`additionalData.${index}.descriptionNp`}
                              initialValue={
                                !isEmpty(editSelectedData)
                                  ? editSelectedData?.additionalData[index]?.descriptionNp
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
                  <div className=' d-flex justify-content-md-end mb-2 border-top border-light pt-5'>
                    <button
                      className='p-2 ps-5 pe-5 btn btn-primary'
                      type='button'
                      onClick={() =>
                        arrayHelpers.push({
                          text: '',
                          textNp: '',
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
        </div>
      </div>
    </>
  )
}
