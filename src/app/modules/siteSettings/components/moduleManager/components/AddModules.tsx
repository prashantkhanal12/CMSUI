import {Form, Formik} from 'formik'
import {useEffect} from 'react'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as social from 'src/app/modules/siteSettings/components/moduleManager'
import * as auth from 'src/app/modules/auth'
import Modal from 'rsuite/Modal'
import {IModuleState} from '../redux/reducer'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import {OptionModel} from 'src/app/modules/cms/components/categories/Model'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  iconClass: Yup.string().required('Icon Class is required'),
  socialIntegrationId: Yup.string().required('Social Integration is required'),
  navigationVisibilityId: Yup.string().required('Navigation Visibility is required'),
  alias: Yup.string().required('Route is required'),
})

const AddModules = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const socialIntData: IModuleState = useSelector((state: any) => state.module)
  useEffect(() => {
    dispatch(social.moduleActions.getAllModule())
  }, [])

  useEffect(() => {
    if (socialIntData?.success) {
      dispatch(social?.moduleActions.getModule(params))
      dispatch(auth.actions.getUserModule())
      isEmpty(editSelectedData)
        ? toast.success('Module setting added successfully')
        : toast.success('Module setting edited successfully')
      dispatch(social?.moduleActions?.addModuleReset())
      dispatch(social?.moduleActions?.updateModuleReset())
      handleClose()
    }
  }, [socialIntData])

  const socialIntegration = socialIntData?.social_integration?.map((data: any) => ({
    label: data.display_name,
    value: data.id,
    systemName: data.system_name,
  }))

  const navVisibility = socialIntData?.navigation_status?.map((data: any) => ({
    label: data.display_name,
    value: data.id,
    systemName: data.system_name,
  }))

  const allModules = socialIntData?.module
    ?.filter((data: any) => data.parentId === null)
    .map((item: any) => ({
      label: item.name,
      value: item.id,
    }))

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        className='w-75'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Module Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                allowInRoute: false,
                name: '',
                iconClass: '',
                socialIntegrationId: '',
                navigationVisibilityId: '',
                alias: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(social.moduleActions.updateModule(formData, editSelectedData?.id))
                } else {
                  dispatch(social.moduleActions.addModule(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['name', 'iconClass', 'alias', 'status', 'allowInRoute']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'navigationVisibilityId',
                      editSelectedData?.navigationVisibility?.id,
                      false
                    )
                    setFieldValue(
                      'socialIntegrationId',
                      editSelectedData?.socialIntegration?.id,
                      false
                    )
                    setFieldValue('parentId', editSelectedData?.parent?.id, false)
                    // setFieldValue('allowInRoute', editSelectedData?.allow_in_route, false)
                  }
                  if (actionType === 'Add') {
                    setFieldValue(
                      'navigationVisibilityId',
                      navVisibility
                        ?.filter((items: any) => items.systemName === 'inactive')
                        .map((item: any) => item.value)
                        .toString(),

                      false
                    )
                    setFieldValue(
                      'socialIntegrationId',
                      socialIntegration
                        ?.filter((items: any) => items.systemName === 'inactive')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                  }
                }, [])
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            placeholder='Module Name'
                            name='name'
                            label='Module Name'
                            containerClassName='col-md-12'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            containerClassName='col-md-12'
                            placeholder='Select Parent Class'
                            label='Parent Class'
                            name='parentId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={allModules}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            placeholder='Icon Class'
                            name='iconClass'
                            label='Icon Class'
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
                            placeholder='Route'
                            name='alias'
                            label='Route'
                            containerClassName='col-md-12'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            containerClassName='col-md-12'
                            placeholder='Select Navigation Status'
                            label='Navigation Status'
                            name='navigationVisibilityId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={navVisibility}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            containerClassName='col-md-12'
                            placeholder='Select Social Integration'
                            label='Social Integration'
                            name='socialIntegrationId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={socialIntegration}
                            defaultValue={values.socialIntegrationId}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <FormCheckbox
                          labelClassName='col-md-12'
                          containerClassName='col-md-6'
                          name='allowInRoute'
                          touched={touched}
                          errors={errors}
                          onChange={handleChange}
                          checkBoxText='Allow in Routes'
                        />

                        <FormCheckbox
                          labelClassName='col-md-12'
                          containerClassName='col-md-6'
                          name='status'
                          touched={touched}
                          errors={errors}
                          onChange={handleChange}
                          checkBoxText='Active'
                        />
                      </div>
                    </div>

                    <div className='d-flex justify-content-end px-9 '>
                      <button
                        type='submit'
                        disabled={socialIntData?.loading}
                        className='btn btn-primary btn-sm ms-3'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={handleClose}
                        className='btn btn-secondary btn-sm ms-3'
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddModules
