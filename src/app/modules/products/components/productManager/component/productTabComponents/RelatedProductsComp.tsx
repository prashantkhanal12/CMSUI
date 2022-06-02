import {FormikErrors} from 'formik'
import {ChangeEvent, useEffect} from 'react'
import * as Yup from 'yup'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {cloneDeep, isEmpty} from 'lodash'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  editSelectedData: {[key: string]: string} | any
  relatedOptions: FormOptionModal[]
  managerOptions: FormOptionModal[]
  validationState: any
  setValidationState: any
  optionName: string
  optionTitle: string
  relatedOptionIdName: string
  setFieldValue: any
}

export function RelatedComponent({
  handleChange,
  errors,
  touched,
  values,
  editSelectedData,
  relatedOptions,
  managerOptions,
  validationState,
  setValidationState,
  optionName,
  optionTitle,
  relatedOptionIdName,
  setFieldValue,
}: Props) {
  const showRelatedId = relatedOptions.find(
    (item: FormOptionModal) => item.value === values[`${optionName}`]
  )

  useEffect(() => {
    if (
      !isEmpty(showRelatedId) &&
      showRelatedId?.systemName === 'yes' &&
      !isEmpty(values[`${optionName}`])
    ) {
      if (optionName === 'productRelatedId') {
        setValidationState({
          ...validationState,
          relatedData: Yup.object().shape({
            text: Yup.string().required('Text is required').nullable(),
            subText: Yup.string().required('Subtext is required').nullable(),
            productId: Yup.string().required('Product is required'),
          }),
        })
      } else if (optionName === 'serviceRelatedId') {
        setValidationState({
          ...validationState,
          relatedData: Yup.object().shape({
            text: Yup.string().required('Text is required').nullable(),
            subText: Yup.string().required('Subtext is required').nullable(),
            serviceId: Yup.string().required('Service is required'),
          }),
        })
      }
    } else if (!isEmpty(showRelatedId) && showRelatedId?.systemName === 'no') {
      let newValidationSchema = cloneDeep(validationState)
      !isEmpty(newValidationSchema['relatedData']) && delete newValidationSchema['relatedData']
      setValidationState(newValidationSchema)
    }
  }, [values])

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label={`Show Related ${optionTitle} Section`}
              name={optionName}
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={relatedOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>

          {showRelatedId?.systemName === 'yes' && (
            <>
              <div className='col-md-6 col-xs-12'>
                <FormSelect
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  placeholder='Please select'
                  label={optionTitle}
                  name={`relatedData.${relatedOptionIdName}`}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  options={managerOptions}
                  required={showRelatedId?.systemName === 'yes' ? true : false}
                  values={values}
                  setFieldValue={setFieldValue}
                  arrValue={`values?.relatedData.${relatedOptionIdName}`}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Text (EN)'
                  name={`relatedData.text`}
                  label='Text (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={showRelatedId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Text (NP)'
                  name={`relatedData.textNp`}
                  label='Text (NP)'
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
                  placeholder='Enter SubText (EN)'
                  name={`relatedData.subText`}
                  label='SubText (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={showRelatedId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter SubText (NP)'
                  name={`relatedData.subTextNp`}
                  label='SubText (NP)'
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
                  placeholder='Enter Button Text (EN)'
                  name={`relatedData.buttonText`}
                  label='Button Text (EN)'
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
                  placeholder='Enter Button Text (NP)'
                  name={`relatedData.buttonTextNp`}
                  label='Button Text (NP)'
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
                  placeholder='Enter Button Link'
                  name={`relatedData.buttonLink`}
                  label='Button Link'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
