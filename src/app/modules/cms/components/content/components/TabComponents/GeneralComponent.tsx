import {FormikErrors} from 'formik'
import * as Yup from 'yup'
import {isEmpty} from 'lodash'
import {ChangeEvent, useEffect} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {TreePicker} from 'rsuite'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: any
  bannerOptions: FormOptionModal[]
  menuOptions: any
  categoryOptions: FormOptionModal[]
  leadFormOptions: FormOptionModal[]
  pageHeaderOptions: FormOptionModal[]
  reviewAndRatingOptions: FormOptionModal[]
  bannerData: FormOptionModal[]
  editSelectedData: {[key: string]: string}
  validationState: {[key: string]: Yup.StringSchema}
  setValidationState: any
  setFieldValue: any
}

export function GeneralComponent({
  handleChange,
  errors,
  touched,
  values,
  categoryOptions,
  bannerOptions,
  menuOptions,
  leadFormOptions,
  pageHeaderOptions,
  reviewAndRatingOptions,
  editSelectedData,
  bannerData,
  validationState,
  setValidationState,
  setFieldValue,
}: Props) {
  const showBannerId = bannerOptions?.find(
    (item: FormOptionModal) => item.value === values.show_banner_id
  )

  const showReviewId = reviewAndRatingOptions?.find(
    (item: FormOptionModal) => item.value === values.show_review_id
  )

  useEffect(() => {
    showBannerId?.systemName === 'yes'
      ? setValidationState({
          ...validationState,
          bannerId: Yup.string().required('Banner is required'),
        })
      : showBannerId?.systemName === 'no'
      ? setValidationState({
          ...validationState,
          bannerId: Yup.string().nullable(),
        })
      : showReviewId?.systemName === 'yes'
      ? setValidationState({
          ...validationState,
          rating: Yup.string().required('Rating is required'),
        })
      : showReviewId?.systemName === 'no'
      ? setValidationState({
          ...validationState,
          rating: Yup.string().nullable(),
        })
      : null
  }, [values.show_banner_id, values.show_review_id])

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please Select Category'
              label='Category'
              name='categoryId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={categoryOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>

          <div className='col-md-6 col-xs-12'>
            <label className='form-label fw-bolder text-dark fs-6'>Menu</label>
            <TreePicker
              size='lg'
              height={50}
              name='menuId'
              className='col-md-12'
              searchable={false}
              defaultExpandAll
              data={menuOptions}
              onSelect={(e: any) => setFieldValue('menuId', e.value)}
              defaultValue={editSelectedData?.menuId}

              // onChange={handleChange}
              // errors={errors}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Content Name (EN)'
              name='content_name'
              label='Content Name (EN)'
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
              placeholder='Enter Content Name (NP)'
              name='content_name_np'
              label='Content Name (NP)'
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
              label='Description (EN)'
              name='description'
              initialValue={!isEmpty(editSelectedData) ? editSelectedData?.description : ''}
              handleChange={handleChange}
              required
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Description (NP)'
              name='description_np'
              initialValue={!isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''}
              handleChange={handleChange}
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
                  : values?.content_name.replace(/\s/g, '-').toLowerCase()
              }
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select Lead Form'
              label='Show Lead Form'
              name='show_lead_form_id'
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
              placeholder='Please select page header'
              label='Enable Page Header'
              name='enable_page_header_id'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={pageHeaderOptions}
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
              label='Show Banner'
              name='show_banner_id'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={bannerOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {showBannerId?.systemName === 'yes' ? (
            <div className='col-md-6 col-xs-12'>
              <FormSelect
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                placeholder='Please select banner'
                label='Banner'
                name='bannerId'
                onChange={handleChange}
                errors={errors}
                touched={touched}
                options={bannerData}
                required
                values={values}
                setFieldValue={setFieldValue}
              />
            </div>
          ) : null}
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select review and rating'
              label='Show Review & Rating'
              name='show_review_id'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={reviewAndRatingOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {showReviewId?.systemName === 'yes' ? (
            <div className='col-md-6 col-xs-12'>
              <FormTextBox
                placeholder='Enter Rating'
                name='rating'
                label='Default Rating'
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                onChange={handleChange}
                errors={errors}
                touched={touched}
                required={true}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
