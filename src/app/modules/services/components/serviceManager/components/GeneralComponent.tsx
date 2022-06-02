import * as Yup from 'yup'
import {isEmpty} from 'lodash'
import {ErrorMessage, FormikErrors} from 'formik'
import {ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react'

// includes
import {FormOptionModal} from '../Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: any}>
  touched: any
  serviceReviewOptions: FormOptionModal[]
  serviceTagOptions: FormOptionModal[]
  serviceCategoryOptions: FormOptionModal[]
  reviewAndRatingOptions: FormOptionModal[]
  servicePopularityOptions: FormOptionModal[]
  serviceLeadFormOptions: FormOptionModal[]
  editSelectedData: {[key: string]: string}
  values: any
  setValidationSchema: Dispatch<SetStateAction<any>>
  validationSchema: any
  serviceFeatureOptions: FormOptionModal[]
  setFieldValue: any
}

export function GeneralComponent({
  handleChange,
  errors,
  touched,
  serviceReviewOptions,
  serviceTagOptions,
  serviceCategoryOptions,
  servicePopularityOptions,
  serviceLeadFormOptions,
  editSelectedData,
  values,
  setValidationSchema,
  validationSchema,
  serviceFeatureOptions,
  setFieldValue,
}: Props) {
  const selectedReviewOption = serviceReviewOptions?.find((option: FormOptionModal) => {
    return option.value === values.reviewId
  })

  useEffect(() => {
    if (
      !isEmpty(values?.reviewId) &&
      !isEmpty(selectedReviewOption) &&
      selectedReviewOption?.systemName === 'yes'
    ) {
      setValidationSchema({
        ...validationSchema,
        review: Yup.string().required('Review rating is required'),
      })
    }
  }, [values.reviewId])
  return (
    <div className='row'>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormTextBox
          type='text'
          placeholder='Enter Service Name (EN)'
          name='title'
          label='Service Name (EN)'
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
          placeholder='Enter Service Name (NP)'
          name='title_np'
          label='Service Name (NP)'
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          onChange={handleChange}
          errors={errors}
          touched={touched}
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormTextBox
          type='text'
          placeholder='Enter Slug'
          name='slug'
          label='Slug'
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          value={
            !isEmpty(editSelectedData)
              ? editSelectedData?.slug
              : values?.title?.replace(/\s/g, '-').toLowerCase()
          }
          disabled
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormSelect
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          placeholder='Please Select Category'
          label='Category'
          name='serviceCategoryId'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          options={serviceCategoryOptions}
          required={true}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormTinyMce
          containerClassName='col-md-12'
          label='Short Description (EN)'
          name='shortDescription'
          handleChange={handleChange}
          required={true}
          initialValue={
            !isEmpty(editSelectedData.shortDescription) ? editSelectedData?.shortDescription : ''
          }
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormTinyMce
          containerClassName='col-md-12'
          label='Short Description (NP)'
          name='shortDescriptionNp'
          handleChange={handleChange}
          initialValue={
            !isEmpty(editSelectedData.shortDescriptionNp)
              ? editSelectedData?.shortDescriptionNp
              : ''
          }
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormTinyMce
          containerClassName='col-md-12'
          label='Description (EN)'
          name='description'
          handleChange={handleChange}
          initialValue={!isEmpty(editSelectedData.description) ? editSelectedData?.description : ''}
          required={true}
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormTinyMce
          containerClassName='col-md-12'
          label='Description (NP)'
          name='descriptionNp'
          handleChange={handleChange}
          initialValue={
            !isEmpty(editSelectedData.descriptionNp) ? editSelectedData?.descriptionNp : ''
          }
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <label className='form-label fw-bolder text-dark fs-6'>Featured in Homepage</label>

        <div className='d-flex ms-5'>
          {serviceFeatureOptions?.map((feature: FormOptionModal) => (
            <FormRadio
              containerClassName=''
              label='Featured in Homepage'
              name='featuredInHomepage'
              type='radio'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              required={true}
              checkBoxText={feature?.label}
              value={feature?.systemName || ''}
            />
          ))}
        </div>
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name='status' component='div' className='field-error-message' />
        </div>
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormSelect
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          placeholder='Please select service tags'
          label='Service Tags'
          name='tags'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          options={serviceTagOptions}
          multiple={true}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormSelect
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          placeholder='Please select popularity'
          label='Popularity'
          name='servicePopularityId'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          options={servicePopularityOptions}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormSelect
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          placeholder='Please select lead form'
          label='Lead Form'
          name='serviceLeadFormId'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          options={serviceLeadFormOptions}
          required={true}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormSelect
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          placeholder='Please select show review'
          label='Show Reviews Section'
          name='reviewId'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          options={serviceReviewOptions}
          required={true}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      {selectedReviewOption?.systemName === 'yes' && (
        <div className='col-md-6 col-sm-6 col-xs-12'>
          <FormTextBox
            type='text'
            placeholder='Please enter you rating'
            name='review'
            label='Default Rating'
            labelClassName='col-md-12'
            containerClassName='col-md-12'
            onChange={handleChange}
            errors={errors}
            touched={touched}
            required={true}
          />
        </div>
      )}
    </div>
  )
}
