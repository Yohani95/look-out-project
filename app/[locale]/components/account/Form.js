import React from 'react'
import SelectField from '@/app/[locale]/components/common/SelectField';
function Form({ t }) {
    const countryOptions = [
        { value: 'option1', label:'option1'},
        { value: 'option2', label: 'option2' },
        // Agrega más opciones según sea necesario
    ];

    const nifOptions = [
        { value: 'optionA', label: 'option1' },
        { value: 'optionB', label: 'option2' },
        // Agrega más opciones según sea necesario
    ];

    const kamOptions = [
        { value: 'optionX', label: 'option1'},
        { value: 'optionY', label: 'option2' },
        // Agrega más opciones según sea necesario
    ];

    const placeOptions = [
        { value: 'optionP', label: 'option1'},
        { value: 'optionQ', label: 'option1' },
        // Agrega más opciones según sea necesario
    ];
    return (
        <div className="card-body">
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-primary me-2">
                    {t('button.see_relations')}
                </button>
                <button type="button" className="btn btn-secondary me-2">
                    {t('button.Modify')}
                </button>
                <button type="button" className="btn btn-danger">
                    {t('button.delete')}
                </button>
            </div>
            <form>
                <div className="mb-3 row align-items-center">
                    <label htmlFor="accountName" className="col-sm-2 col-form-label">
                        {t('name')}
                    </label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="accountName" />
                    </div>
                    <SelectField
                        label={t('country')}
                        options={countryOptions}
                        preOption={t('select')}
                        labelClassName="col-sm-2 col-form-label"
                        divClassName="col-sm-4"
                    />
                </div>

                <div className="mb-3 row align-items-center">
                    <SelectField
                        label={t('main_account')}
                        labelClassName="col-sm-2 col-form-label"
                        divClassName="col-sm-4"
                        preOption={t('select')}
                        options={nifOptions} />
                </div>

                <div className="mb-3 row align-items-center">
                    <label htmlFor="nif" className="col-sm-1 col-form-label">
                        {t('nif')}
                    </label>
                    <div className="col-sm-3">
                        <input type="text" className="form-control" id="nif" />
                    </div>
                    <SelectField label={t('place')} options={kamOptions}
                    labelClassName="col-sm-1 col-form-label"
                    preOption={t('select')}
                    divClassName="col-sm-3" />
                    <SelectField label={t('KAM')} options={placeOptions}
                    preOption={t('select')}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3" />
                </div>

                <div className="mb-3 row align-items-center">
                    <label htmlFor="address" className="col-sm-2 col-form-label">
                        {t('address')}
                    </label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="address" />
                    </div>
                    <label htmlFor="status" className="col-sm-2 col-form-label">
                        {t('status')}
                    </label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="status" />
                    </div>
                </div>

                <div className="mb-3 row align-items-center">
                    <label htmlFor="city" className="col-sm-1 col-form-label">
                        {t('city')}
                    </label>
                    <div className="col-sm-3">
                        <input type="text" className="form-control" id="city" />
                    </div>
                    <label htmlFor="web" className="col-sm-1 col-form-label">
                        {t('web')}
                    </label>
                    <div className="col-sm-3">
                        <input type="text" className="form-control" id="web" />
                    </div>
                    <label htmlFor="phone" className="col-sm-1 col-form-label">
                        {t('phone')}
                    </label>
                    <div className="col-sm-3">
                        <input type="text" className="form-control" id="phone" />
                    </div>
                </div>
            </form>
            <hr />
        </div>
    )
}

export default Form