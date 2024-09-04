'use client';
import React from 'react';
import FormProject from '@/app/[locale]/components/project/FormProject';
import MyTitle from '@/app/[locale]/components/common/MyTitle';
import { useTranslations } from 'next-intl';
import SelectField from '@/app/[locale]/components/common/SelectField';
import TableCommon from '@/app/[locale]/components/common/TableCommon';
function page() {
  const t = useTranslations();
  const kamOptions = [
    { value: 'optionX', label: 'option1' },
    { value: 'optionY', label: 'option2' },
    // Agrega más opciones según sea necesario
  ];
  const generateRandomData = (rowCount) => {
    const data = [];
    for (let i = 1; i <= rowCount; i++) {
      const randomAge = Math.floor(Math.random() * 30) + 20; // Edad aleatoria entre 20 y 49
      data.push({
        id: i,
        milestoneName: `Person ${i}`,
        milestoneAmount: randomAge,
        ClosingDate: randomAge,
        ClosingDateReal: randomAge,
        progress: randomAge,
        milestone: `person${i}@example.com`,
        comments: randomAge,
      });
    }
    return data;
  };
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'milestoneName', title: `${t('business.milestoneName')}` },
    { key: 'milestoneAmount', title: `${t('business.milestoneAmount')}` },
    { key: 'ClosingDate', title: `${t('business.estimatedClosingDate')}` },
    { key: 'ClosingDateReal', title: t('business.estimatedClosingDateReal') },
    { key: 'progress', title: `% ${t('project.progressMilestone')}` },
    {
      key: 'milestone',
      title: `${t('Common.status')} ${t('Common.milestone')}`,
    },
    { key: 'comments', title: `${t('business.generalComments')}` },
    // ... más columnas ...
  ];
  const data = generateRandomData(40);
  const options = kamOptions;
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t('Nav.projects.addKickOff')} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow">
          <div className="container">
            <div className="d-flex justify-content-end mt-2"></div>
            <FormProject t={t} />
            <hr />
            <div className="mb-3 row align-items-center">
              <SelectField
                label={`${t('Common.boss')} ${t('Common.project')}`}
                options={kamOptions}
                preOption={t('Account.select')}
                labelClassName="col-sm-1 col-form-label"
                divClassName="col-sm-3"
              />
            </div>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t('project.agreedClosingDate')}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t('project.agreedTerm')}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
              <div className="col-sm-2">
                <select className="form-control form-select">
                  <option value="">{t('Account.select')}</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <label
                htmlFor="estimatedClosingDate"
                className="col-sm-1 col-form-label"
              >
                {t('project.agreedClosingDate')}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="estimatedClosingDate"
                />
              </div>
            </div>
            <TableCommon
              columns={columns}
              noResultsFound={t('Common.noResultsFound')}
              data={data}
              title={t('project.projectList')}
              search={t('Account.table.search')}
              idioma={t('Account.action')}
            />
            <div className="d-flex justify-content-start mb-3">
              <button type="button" className="btn btn-success me-2 badge">
                {t('Account.button.Modify')}
              </button>
              <button type="button" className="btn btn-danger me-2 badge">
                {t('Account.button.delete')}
              </button>
              <button type="button" className="btn btn-primary badge">
                {t('project.newMilestone')}
              </button>
            </div>
            <div className="d-flex justify-content-end mt-2 mb-2 container">
              <div className="col-sm-1">
                <button className="btn btn-primary">
                  {t('Common.saveDraf')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
