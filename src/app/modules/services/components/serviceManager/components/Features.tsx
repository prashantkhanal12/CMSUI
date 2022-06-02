import {FieldArray, FormikErrors} from 'formik'
import {cloneDeep, isEmpty} from 'lodash'
import {ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {FeatureArrayType, FormOptionModal} from '../Model'
import * as Yup from 'yup'
import {Button} from 'rsuite'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: any}>
  touched: any
  serviceFeatureOptions: FormOptionModal[]
  values: any
  setValidationSchema: Dispatch<SetStateAction<any>>
  validationSchema: any
  editSelectedData: any
  setFieldValue: any
}

const Features = ({
  handleChange,
  errors,
  touched,
  serviceFeatureOptions,
  values,
  setValidationSchema,
  validationSchema,
  editSelectedData,
  setFieldValue,
}: Props) => {
  const serviceFeatureOption = serviceFeatureOptions?.find((option: FormOptionModal) => {
    return option.value === values.serviceFeatureId
  })

  useEffect(() => {
    if (
      !isEmpty(values?.serviceFeatureId) &&
      !isEmpty(serviceFeatureOption) &&
      serviceFeatureOption?.systemName === 'yes'
    ) {
      setValidationSchema({
        ...validationSchema,
        featureData: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().required('Feature section title is required').nullable(),
          })
        ),
        features: Yup.array().of(
          Yup.object().shape({
            description: Yup.string().required('Description is required').nullable(),
          })
        ),
      })
    } else if (!isEmpty(serviceFeatureOption) && serviceFeatureOption?.systemName === 'no') {
      let newValidationSchema = cloneDeep(validationSchema)
      !isEmpty(newValidationSchema['featureData']) && delete newValidationSchema['featureData']
      !isEmpty(newValidationSchema['features']) && delete newValidationSchema['features']
      setValidationSchema(newValidationSchema)
    }
  }, [values.serviceFeatureId])

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormSelect
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          placeholder='Please select'
          label='Show Features Section'
          name='serviceFeatureId'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          options={serviceFeatureOptions}
          required={true}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      {serviceFeatureOption?.systemName === 'yes' && (
        <div className='row'>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Features Section Title (NP)'
              name='featureData[0].title'
              label='Features Section Title (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              required={true}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Features Section Title (NP)'
              name='featureData[0].titleNp'
              label='Features Section Title (NP)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Features Section Description (EN)'
              name='featureData[0].description'
              handleChange={handleChange}
              initialValue={
                !isEmpty(editSelectedData) &&
                !isEmpty(editSelectedData?.featureData[0]?.description)
                  ? editSelectedData?.featureData[0]?.description
                  : ''
              }
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Features Section Description (NP)'
              name='featureData[0].descriptionNp'
              handleChange={handleChange}
              initialValue={
                !isEmpty(editSelectedData) &&
                !isEmpty(editSelectedData?.featureData[0]?.descriptionNp)
                  ? editSelectedData?.featureData[0]?.descriptionNp
                  : ''
              }
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Features Section Help Text (EN)'
              name='featureData[0].helpText'
              handleChange={handleChange}
              initialValue={
                !isEmpty(editSelectedData) && !isEmpty(editSelectedData?.featureData[0]?.helpText)
                  ? editSelectedData?.featureData[0]?.helpText
                  : ''
              }
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Features Section Help Text (NP)'
              name='featureData[0].helpTextNp'
              handleChange={handleChange}
              initialValue={
                !isEmpty(editSelectedData) && !isEmpty(editSelectedData?.featureData[0]?.helpTextNp)
                  ? editSelectedData?.featureData[0]?.helpTextNp
                  : ''
              }
            />
          </div>
          <FieldArray
            name='features'
            render={(arrayHelpers) => (
              <div>
                {values.features &&
                  values.features.length > 0 &&
                  values.features.map((feature: FeatureArrayType, index: number) => (
                    <div className='row' key={index}>
                      <div className='col-md-6 col-sm-6 col-xs-12'>
                        <FormTinyMce
                          containerClassName='col-md-12'
                          label='Description (EN)'
                          name={`features[${index}].description`}
                          handleChange={handleChange}
                          initialValue={
                            !isEmpty(editSelectedData) &&
                            !isEmpty(editSelectedData?.features[index]?.description)
                              ? editSelectedData?.features[index]?.description
                              : ''
                          }
                          required={true}
                        />
                      </div>

                      <div className='col-md-6 col-sm-6 col-xs-12'>
                        <FormTinyMce
                          containerClassName='col-md-12'
                          label='Description (NP)'
                          name={`features[${index}].descriptionNp`}
                          handleChange={handleChange}
                          initialValue={
                            !isEmpty(editSelectedData) &&
                            !isEmpty(editSelectedData?.features[index]?.descriptionNp)
                              ? editSelectedData?.features[index]?.descriptionNp
                              : ''
                          }
                        />
                      </div>
                      <div className='col-md-6 col-sm-6 col-xs-12'></div>
                      {index > 0 && (
                        <div className='col-md-6 col-sm-6 col-xs-12 justify-content-end text-end md-2'>
                          <button
                            type='button'
                            className='p-2 ps-5 pe-5 btn btn-danger'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                <div className='d-flex mt-5 w-100 justify-content-end border-top border-light pt-5'>
                  <Button
                    type='button'
                    className='p-2 ps-5 pe-5 btn btn-primary'
                    onClick={() =>
                      arrayHelpers.push({
                        description: '',
                        descriptionNp: '',
                      })
                    }
                  >
                    Add Section +
                  </Button>
                </div>
                {/* <div>
                  <button type='submit'>Submit</button>
                </div> */}
              </div>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default Features
