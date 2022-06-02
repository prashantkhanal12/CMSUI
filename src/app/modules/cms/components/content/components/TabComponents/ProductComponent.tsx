import {FormikErrors} from 'formik'
import {ChangeEvent, useEffect} from 'react'
import * as Yup from 'yup'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: any
  productDataOptions: FormOptionModal[]
  productOptionOptions: FormOptionModal[]
  validationState: {[key: string]: Yup.StringSchema}
  setValidationState: any
  setFieldValue: any
}

export function ProductComponent({
  handleChange,
  errors,
  touched,
  values,
  productOptionOptions,
  productDataOptions,
  validationState,
  setValidationState,
  setFieldValue,
}: Props) {
  const showProductSectionId = productOptionOptions?.find(
    (item: FormOptionModal) => item.value === values.productSectionId
  )

  useEffect(() => {
    showProductSectionId?.systemName === 'yes'
      ? setValidationState({
          ...validationState,
          productData: Yup.object().shape({
            productId: Yup.string().required('Product is required'),
            text: Yup.string().required('Text is required'),
            sub_text: Yup.string().required('Subtext is required'),
          }),
        })
      : showProductSectionId?.systemName === 'no'
      ? setValidationState({
          ...validationState,
          applyData: Yup.object().shape({
            productId: Yup.string().nullable(),
            text: Yup.string().nullable(),
            sub_text: Yup.string().nullable(),
          }),
        })
      : null
  }, [values.productSectionId])


  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Products'
              name='productSectionId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={productOptionOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {showProductSectionId?.systemName === 'yes' ? (
            <>
              <div className='col-md-6 col-xs-12'>
                <FormSelect
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  placeholder='Please select product'
                  label='Products'
                  name={`productData.productId`}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  options={productDataOptions}
                  required
                  values={values}
                  setFieldValue={setFieldValue}
                  arrValue={values?.productData.productId}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Text (EN)'
                  name={`productData.text`}
                  label='Text (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={showProductSectionId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Text (NP)'
                  name={`productData.text_np`}
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
                  placeholder='Enter Sub Text (EN)'
                  name={`productData.sub_text`}
                  label='Sub Text (EN)'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={showProductSectionId?.systemName === 'yes' ? true : false}
                />
              </div>
              <div className='col-md-6 col-xs-12'>
                <FormTextBox
                  type='text'
                  placeholder='Enter Sub Text (NP)'
                  name={`productData.sub_text_np`}
                  label='Sub Text (NP)'
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
                  name={`productData.button_text`}
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
                  name={`productData.button_text_np`}
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
                  name={`productData.button_link`}
                  label='Button Link'
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
