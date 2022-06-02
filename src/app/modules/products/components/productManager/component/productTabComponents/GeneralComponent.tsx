import {ErrorMessage, FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import {ChangeEvent} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  editSelectedData: {[key: string]: string}
  productCategoryOptions: FormOptionModal[]
  productTagOptions: FormOptionModal[]
  productPopularityOptions: FormOptionModal[]
  leadFormOptions: FormOptionModal[]
  interestRateOptions: FormOptionModal[]
  reviewOptions: FormOptionModal[]
  competitorOptions: FormOptionModal[]
  setFieldValue: any
}

export function GeneralComponent({
  handleChange,
  errors,
  touched,
  values,
  editSelectedData,
  productCategoryOptions,
  productTagOptions,
  productPopularityOptions,
  leadFormOptions,
  interestRateOptions,
  reviewOptions,
  competitorOptions,
  setFieldValue,
}: Props) {
  const featuredOptions = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
  ]

  const selectedReviewOption = reviewOptions.find(
    (item: FormOptionModal) => item.value === values.reviewId
  )

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Title (EN)'
              name='title'
              label='Title (EN)'
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
              placeholder='Enter Title (NP)'
              name='title_np'
              label='Title (NP)'
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
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Enter Slug'
              label='Slug'
              name='slug'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              disabled={true}
              value={
                !isEmpty(editSelectedData)
                  ? editSelectedData?.slug
                  : values?.title.replace(/\s/g, '-').toLowerCase()
              }
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please Select Category'
              label='Category'
              name='productCategoryId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={productCategoryOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Short Description (EN)'
              name='shortDescription'
              initialValue={!isEmpty(editSelectedData) ? editSelectedData?.shortDescription : ''}
              handleChange={handleChange}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Short Description (NP)'
              name='shortDescriptionNp'
              initialValue={!isEmpty(editSelectedData) ? editSelectedData?.shortDescriptionNp : ''}
              handleChange={handleChange}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Description (EN)'
              name='description'
              initialValue={!isEmpty(editSelectedData) ? editSelectedData?.description : ''}
              handleChange={handleChange}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Description (NP)'
              name='descriptionNp'
              initialValue={!isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''}
              handleChange={handleChange}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <label className='form-label fw-bolder text-dark fs-6 required'>
              Featured in Homepage
            </label>

            <div className='d-flex ms-5'>
              {featuredOptions?.map((featuredInHomepage: {label: string; value: string}) => (
                <FormRadio
                  containerClassName=''
                  label='Featured in Homepage'
                  name='featuredInHomepage'
                  type='radio'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                  checkBoxText={featuredInHomepage?.label}
                  value={featuredInHomepage.value}
                />
              ))}
            </div>
            <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
              <ErrorMessage name='status' component='div' className='field-error-message' />
            </div>
          </div>

          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Product Tags'
              name='tags'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={productTagOptions}
              values={values}
              setFieldValue={setFieldValue}
              required
              // multiple={true}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Product Popularity'
              name='productPopularityId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={productPopularityOptions}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>

          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Lead Form'
              name='productLeadFormId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={leadFormOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Interest Rate'
              name='interestRateId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={interestRateOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Reviews Section'
              name='reviewId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={reviewOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {selectedReviewOption?.systemName === 'yes' ? (
            <div className='col-md-6 col-xs-12'>
              <FormTextBox
                placeholder='Enter Title (EN)'
                name='review'
                label='Default Review'
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                onChange={handleChange}
                errors={errors}
                touched={touched}
                required={selectedReviewOption?.systemName === 'yes' ? true : false}
              />
            </div>
          ) : null}
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Is this a competitor product ?'
              name='competitorStatusId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={competitorOptions}
              values={values}
              setFieldValue={setFieldValue}
              required
            />
          </div>
        </div>
      </div>
    </>
  )
}
