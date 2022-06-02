import {FieldArray, FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import * as Yup from 'yup'
import {ChangeEvent, useEffect} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {ContentModel} from '../../Model/ContentModal'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: any
  editSelectedData: any
  collapsibleSectionOptions: FormOptionModal[]
  validationState: {[key: string]: Yup.StringSchema}
  setValidationState: any
  setFieldValue: any
}

export default function CollapsibleSection({
  handleChange,
  errors,
  touched,
  values,
  editSelectedData,
  collapsibleSectionOptions,
  validationState,
  setValidationState,
  setFieldValue,
}: Props) {
  const showCollapsibleSectionId = collapsibleSectionOptions?.find(
    (item: FormOptionModal) => item.value === values.show_collapsible_id
  )

  useEffect(() => {
    showCollapsibleSectionId?.systemName === 'yes'
      ? setValidationState({
          ...validationState,
          collapsibleData: Yup.array().of(
            Yup.object().shape({
              title: Yup.string().required('Title is required'),
            })
          ),
        })
      : showCollapsibleSectionId?.systemName === 'no'
      ? setValidationState({
          ...validationState,
          collapsibleData: Yup.array().of(
            Yup.object().shape({
              title: Yup.string().nullable(),
            })
          ),
        })
      : null;
    (showCollapsibleSectionId?.systemName === 'yes' &&
      values.collapsibleData?.length > 1) &&
      values.collapsibleData.push({
        title: '',
        title_np: '',
        description: '',
        description_np: '',
      })
  }, [values.show_collapsible_id])
  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Collapsible Section'
              name='show_collapsible_id'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={collapsibleSectionOptions}
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
              placeholder='Enter Section Title (EN)'
              name='collapsible_title'
              label='Section Title (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              required={true}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Section Title (NP)'
              name='collapsible_title_np'
              label='Section Title (NP)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          {showCollapsibleSectionId?.systemName === 'yes' ? (
            <FieldArray
              name='collapsibleData'
              render={(arrayHelpers) => (
                <div>
                  {values.collapsibleData && values.collapsibleData.length > 0
                    ? values.collapsibleData.map((friend: any, index: any) => (
                        <div className='row' key={index}>
                          <div className='col-md-6 col-xs-12'>
                            <FormTextBox
                              type='text'
                              placeholder='Enter Text (EN)'
                              name={`collapsibleData[${index}].title`}
                              label='Text (EN)'
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required
                            />
                          </div>
                          <div className='col-md-6 col-xs-12'>
                            <FormTextBox
                              type='text'
                              placeholder='Enter Text (NP)'
                              name={`collapsibleData[${index}].title_np`}
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
                              name={`collapsibleData.${index}.description`}
                              initialValue={
                                !isEmpty(editSelectedData)
                                  ? editSelectedData?.collapsibleData[index].description
                                  : ''
                              }
                              handleChange={handleChange}
                              required
                            />
                          </div>
                          <div className='col-md-6 col-xs-12'>
                            <FormTinyMce
                              containerClassName='col-md-12'
                              labelClassName='col-md-12'
                              label='Description (NP)'
                              name={`collapsibleData.${index}.description_np`}
                              initialValue={
                                !isEmpty(editSelectedData)
                                  ? editSelectedData?.collapsibleData[index].description_np
                                  : ''
                              }
                              handleChange={handleChange}
                            />
                          </div>

                          {index > 0 && (
                            <div className=' d-flex justify-content-md-end'>
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
                  <div className=' d-flex justify-content-md-end mb-2'>
                    <button
                      className='p-2 ps-5 pe-5 mt-5 btn btn-primary'
                      type='button'
                      onClick={() =>
                        arrayHelpers.push({
                          title: '',
                          title_np: '',
                          description: '',
                          description_np: '',
                        })
                      }
                    >
                      + Add More
                    </button>
                  </div>
                </div>
              )}
            />
          ) : null}
        </div>
      </div>
    </>
  )
}
