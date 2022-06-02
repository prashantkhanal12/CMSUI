import {useEffect, useState} from 'react'
import {FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import TreePicker from 'rsuite/TreePicker'
import {ChangeEvent} from 'react'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import {FormOptionModal} from '../Model'
import {MenuModal} from '../Model/MenuModal'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}>
  touched: any
  editSelectedData?: MenuModal
  iconTypeOptions?: FormOptionModal[]
  linkTypeOptions?: FormOptionModal[]
  menuStatusOptions?: FormOptionModal[]
  menuTypeOptions?: FormOptionModal[]
  menuOptions?: any
  topMenuOptions?: FormOptionModal[]
  serviceDataOptions?: FormOptionModal[]
  productDataOptions?: FormOptionModal[]
  contentCategoryOptions?: FormOptionModal[]
  visibilityStatusOptions?: FormOptionModal[]
  contentDataOptions?: FormOptionModal[]
  setSelectedContentCat?: any
  values: {[key: string]: string} | any
  setFieldValue?: any
}

export function BasicMenuInfo({
  handleChange,
  errors,
  touched,
  iconTypeOptions,
  linkTypeOptions,
  menuStatusOptions,
  menuOptions,
  menuTypeOptions,
  editSelectedData,
  contentDataOptions,
  setFieldValue,
  productDataOptions,
  contentCategoryOptions,
  serviceDataOptions,
  setSelectedContentCat,
  values,
  visibilityStatusOptions,
}: Props) {
  const selectedIconTypeId = iconTypeOptions?.find(
    (item: FormOptionModal) => item.value === values.iconType
  )
  const selectedLinkTypeId = linkTypeOptions?.find(
    (item: FormOptionModal) => item.value === values.menuLinkType
  )
  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Menu Title (EN)'
              name='name'
              label='Menu Title (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={(e:any)=>{
                handleChange(e);
                !isEmpty(editSelectedData)
                  ? editSelectedData?.slug
                  : setFieldValue("slug",e.target.value.replace(/\s/g, '-').toLowerCase()) 
              }}
              errors={errors}
              touched={touched}
              required={true}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Menu Title (NP)'
              name='nameNp'
              label='Menu Title (NP)'
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
              required
            />
          </div>

          <div className='col-md-6 col-xs-12'>
            <label className='form-label fw-bolder text-dark fs-6'>Parent Menu</label>
            <TreePicker
              size='lg'
              height={50}
              name='parentId'
              className='col-md-12'
              searchable={false}
              defaultExpandAll
              data={menuOptions}
              onSelect={(e: any) => setFieldValue('parentId', e.value)}
              defaultValue={editSelectedData?.parentId}

              // onChange={handleChange}
              // errors={errors}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Select Icon Type'
              label='Icon Type'
              name='iconType'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={iconTypeOptions}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {selectedIconTypeId?.systemName === 'image' ? (
            <div className='col-md-6 col-xs-12'>
              <FormInputMediaManager
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                label='Menu Image'
                name='menuImage'
                setFieldValue={setFieldValue}
                value={values?.menuImage}
              />

              {!isEmpty(values?.menuImage) ? (
                <>
                  <li className='listing'>
                    <div className='thumbImageBlock'>
                      <button
                        type='button'
                        title='Remove'
                        className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                        onClick={() => {
                          setFieldValue('menuImage', '')
                        }}
                      >
                        Delete
                      </button>

                      <img
                        className='thumbImage w-100 h-100'
                        src={`${imageBaseUrl}/${values?.menuImage}`}
                        alt=''
                      />
                    </div>
                  </li>
                </>
              ) : null}
            </div>
          ) : selectedIconTypeId?.systemName === 'class' ? (
            <div className='col-md-6 col-xs-12'>
              <FormTextBox
                type='text'
                placeholder='Fa-icons Eg: fa-5'
                name='menuIcon'
                label='Icon Class'
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                onChange={handleChange}
                errors={errors}
                touched={touched}
              />
            </div>
          ) : null}
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Select Menu Link Type'
              label='Link Type'
              name='menuLinkType'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={linkTypeOptions}
              values={values}
              setFieldValue={setFieldValue}
              required
            />
          </div>
          {selectedLinkTypeId?.systemName === 'product' ? (
            <div className='col-md-6 col-xs-12'>
              <FormSelect
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                placeholder='Please select'
                label='Product'
                name='productId'
                onChange={handleChange}
                errors={errors}
                touched={touched}
                options={productDataOptions}
                values={values}
                setFieldValue={setFieldValue}
              />
            </div>
          ) : selectedLinkTypeId?.systemName === 'content' ? (
            <>
              <div className='col-md-6 col-xs-12'>
                <FormSelect
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  placeholder='Please select'
                  label='Category'
                  name='categoryId'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  options={contentCategoryOptions}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
              {!isEmpty(values?.categoryId) ? setSelectedContentCat(values.categoryId) : null}
              <div className='col-md-6 col-xs-12'>
                <FormSelect
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  placeholder='Please select'
                  label='Content Category'
                  name='contentId'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  options={contentDataOptions}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
            </>
          ) : selectedLinkTypeId?.systemName === 'url' ? (
            <div className='col-md-6 col-xs-12'>
              <FormTextBox
                type='text'
                placeholder='URL'
                name='url'
                label='URL'
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                onChange={handleChange}
                errors={errors}
                touched={touched}
              />
            </div>
          ) : selectedLinkTypeId?.systemName === 'file' ? (
            <div className='col-md-6 col-xs-12'>
              <FormInputMediaManager
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                label='File'
                name='file'
                setFieldValue={setFieldValue}
                value={values?.file}
              />
            </div>
          ) : selectedLinkTypeId?.systemName === 'services' ? (
            <div className='col-md-6 col-xs-12'>
              <FormSelect
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                placeholder='Please select'
                label='Service Category'
                name='serviceId'
                onChange={handleChange}
                errors={errors}
                touched={touched}
                values={values}
                setFieldValue={setFieldValue}
                options={serviceDataOptions}
              />
            </div>
          ) : null}

          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Select Menu Type'
              label='Menu Type'
              name='menuType'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={menuTypeOptions}
              values={values}
              setFieldValue={setFieldValue}
              required
            />
          </div>

          <div className='col-md-6 col-xs-12'>
            <FormInputMediaManager
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              label='Featured Image'
              name='featuredImage'
              setFieldValue={setFieldValue}
              value={values?.featuredImage}
            />

            {!isEmpty(values?.featuredImage) ? (
              <>
                <li className='listing'>
                  <div className='thumbImageBlock'>
                    <button
                      type='button'
                      title='Remove'
                      className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                      onClick={() => {
                        setFieldValue('featuredImage', '')
                      }}
                    >
                      Delete
                    </button>

                    <img
                      className='thumbImage w-100 h-100'
                      src={`${imageBaseUrl}/${values?.featuredImage}`}
                      alt=''
                    />
                  </div>
                </li>
              </>
            ) : null}
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Featured Image Text (EN)'
              name='featuredImageText'
              label='Featured Image Text (EN)'
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
              placeholder='Featured Image Text (NP)'
              name='featuredImageTextNp'
              label='Featured Image Text (NP)'
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
              placeholder='Featured Image URL'
              name='featuredImageUrl'
              label='Featured Image URL'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Hide in Website'
              name='hideInWebsite'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={visibilityStatusOptions}
              values={values}
              required
              setFieldValue={setFieldValue}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Select Status'
              label='Status'
              name='status'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={menuStatusOptions}
              values={values}
              required
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      </div>
    </>
  )
}
