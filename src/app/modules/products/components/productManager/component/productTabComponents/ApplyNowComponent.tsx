import {FormikErrors} from 'formik'
import {ChangeEvent, useEffect} from 'react'
import * as Yup from 'yup'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {cloneDeep, isEmpty} from 'lodash'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  applyNowOptions: FormOptionModal[]
  validationState: any
  setValidationState: any
  optionName: string
  setFieldValue: any
}

export function ApplyNowComponent({
  handleChange,
  errors,
  touched,
  values,
  applyNowOptions,
  validationState,
  setValidationState,
  optionName,
  setFieldValue,
}: Props) {
  const applyNowId = applyNowOptions?.find(
    (item: FormOptionModal) => item.value === values[`${optionName}`]
  )

  useEffect(() => {
    if (
      !isEmpty(applyNowId) &&
      applyNowId?.systemName === 'yes' &&
      !isEmpty(values[`${optionName}`])
    ) {
      setValidationState({
        ...validationState,
        applyData: Yup.object().shape({
          text: Yup.string().required(`Text is required`).nullable(),
          firstButtonText: Yup.string().required('First Button Text is required').nullable(),
          firstButtonLink: Yup.string().required('First Button Link is required').nullable(),
        }),
      })
    } else if (!isEmpty(applyNowId) && applyNowId?.systemName === 'no') {
      let newValidationSchema = cloneDeep(validationState)
      !isEmpty(newValidationSchema['applyData']) && delete newValidationSchema['applyData']
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
              label='Show Apply Now Section'
              name={optionName}
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={applyNowOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
        {applyNowId?.systemName === 'yes' ? (
          <>
            <div className='row'>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Text (EN)'
                  name={`applyData.text`}
                  label='Text (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={applyNowId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Text (NP)'
                  name={`applyData.textNp`}
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
                  placeholder='Enter First Button Text (EN)'
                  name={`applyData.firstButtonText`}
                  label='First Button Text (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={applyNowId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter First Button Text (NP)'
                  name={`applyData.firstButtonTextNp`}
                  label='First Button Text (NP)'
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
                  placeholder='Enter First Button Link'
                  name={`applyData.firstButtonLink`}
                  label='First Button Link'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={applyNowId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Second Button Text (EN)'
                  name={`applyData.secondButtonText`}
                  label='Second Button Text (EN)'
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
                  placeholder='Enter Second Button Text (NP)'
                  name={`applyData.secondButtonTextNp`}
                  label='Second Button Text (NP)'
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
                  placeholder='Enter Second Button Link'
                  name={`applyData.secondButtonLink`}
                  label='Second Button Link'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}
