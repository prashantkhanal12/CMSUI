import {FieldArray, FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import {ChangeEvent, useEffect} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import * as Yup from 'yup'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  editSelectedData: {[key: string]: string} | any
  featuresOption: FormOptionModal[]
  validationState: any
  setValidationState: any
  setFieldValue: any
}

export function FeaturesComponent({
  handleChange,
  errors,
  touched,
  values,
  editSelectedData,
  featuresOption,
  validationState,
  setValidationState,
  setFieldValue,
}: Props) {
  const featureId = featuresOption.find(
    (item: FormOptionModal) => item.value === values.productFeatureId
  )

  useEffect(() => {
    {
      featureId?.systemName === 'yes'
        ? setValidationState({
            ...validationState,
            featureData: Yup.object().shape({
              title: Yup.string().required('Feature title is required'),
            }),
          })
        : null
    }
  }, [values?.productFeatureId])

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Features Section'
              name='productFeatureId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={featuresOption}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
        {featureId?.systemName === 'yes' ? (
          <>
            <div className='row'>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Features Section Title (EN)'
                  name={`featureData.title`}
                  label='Features Section Title (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={featureId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Features Section Title (NP)'
                  name={`featureData.titleNp`}
                  label='Features Section Title (NP)'
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
                  label='Features Section Description (EN)'
                  name={`featureData.description`}
                  initialValue={
                    !isEmpty(editSelectedData) ? editSelectedData?.featureData?.description : ''
                  }
                  handleChange={handleChange}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTinyMce
                  containerClassName='col-md-12'
                  labelClassName='col-md-12'
                  label='Features Section Description (NP)'
                  name={`featureData.descriptionNp`}
                  initialValue={
                    !isEmpty(editSelectedData) ? editSelectedData?.featureData?.descriptionNp : ''
                  }
                  handleChange={handleChange}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTinyMce
                  containerClassName='col-md-12'
                  label='Help Text (EN)'
                  name={`featureData.helpText`}
                  initialValue={
                    !isEmpty(editSelectedData) ? editSelectedData?.featureData?.helpText : ''
                  }
                  handleChange={handleChange}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTinyMce
                  containerClassName='col-md-12'
                  label='Help Text (NP)'
                  name={`featureData.helpTextNp`}
                  initialValue={
                    !isEmpty(editSelectedData) ? editSelectedData?.featureData?.helpTextNp : ''
                  }
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className='row'>
              <span
                className='bg-danger pt-3 pb-3 fs-4'
                style={{textDecoration: 'bolder', color: 'white'}}
              >
                Please enter at least one feature
              </span>
            </div>
            <div className='row'>
              <FieldArray
                name='features'
                render={(arrayHelpers) => (
                  <div>
                    <div className=' d-flex justify-content-md-end mb-2'>
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
                    {values.features && values.features.length > 0
                      ? values.features.map((friend: any, index: any) => (
                          <div className='row mb-4' key={index}>
                            <div className='col-md-6 col-xs-12'>
                              <FormTinyMce
                                containerClassName='col-md-12'
                                labelClassName='col-md-12'
                                label='Description (EN)'
                                name={`features.${index}.description`}
                                initialValue={
                                  !isEmpty(editSelectedData)
                                    ? editSelectedData?.features[index]?.description
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
                                name={`features.${index}.descriptionNp`}
                                initialValue={
                                  !isEmpty(editSelectedData)
                                    ? editSelectedData?.features[index]?.descriptionNp
                                    : ''
                                }
                                handleChange={handleChange}
                              />
                            </div>

                            {index > 0 && (
                              <div className=' d-flex justify-content-md-end mb-2'>
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
