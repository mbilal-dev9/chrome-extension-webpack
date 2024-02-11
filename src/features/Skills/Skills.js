import React, { useEffect, useState } from 'react';
import { useSkills } from './hooks/useSkills';
import SkillTable from './SkillTable';
import Button from '@mui/material/Button';
import BaseModal from './components/BaseModal';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';
import ErrorDialog from '../Jobs/ErrorDialog';

const Skills = () => {
	const [showSkills, setShowSkills] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
	const accessToken = localStorage.getItem('accessToken');

	const {
		fetchSkill,
		skillList,
		isFetching,
		mutateDeleteProduct,
		setSkillId,
		setSearchKey,
		fetchSmartSearch,
		searchList,
		isLoading,
		handleCreateSkill,
		setSkillData,
		skillData,
		updateUserSkill,
		setOpen,
		open,
		setTextData,
		textData,
		setSkillName,
		skillName,
		setModalType,
		modalType,
		formik,
	} = useSkills();

	useEffect(() => {
		if (!!accessToken) {
			fetchSkill();
			setShowSkills(true);
			setShowErrorMessage(false);
		} else {
			setShowSkills(false);
			setShowErrorMessage(true);
		}
	}, []);

	const handleEdit = (data) => {
		formik.setFieldValue('name', data?.name);
		formik.setFieldValue('expertise', data?.expertise);
		setSkillId(data?.id);
		setModalType('Update');
		setOpen(true);
	};

	const handleDelete = (id) => {
		mutateDeleteProduct(id);
	};

	const handleOpenModal = () => {
		fetchSmartSearch();
		setModalType('Add');
		setOpen(true);
	};

	return showSkills ? (
		<div>
			<Grid style={{ marginTop: '66px', padding: '0 60px' }}>
				<div>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='h1' sx={{ fontSize: '30px', fontWeight: '700', lineHeight: '23px' }}>
							My Skills
						</Typography>
						<Button
							sx={(theme) => ({
								color: theme.palette.universalWhite.main,
								backgroundColor: theme.palette.success.dark,
								borderRadius: '100px',
								boxShadow: 'none',
								'&:hover': {
									backgroundColor: theme.palette.success.dark,
									boxShadow: 'none',
								},
							})}
							style={{ height: '43px', padding: '10px 48px', fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
							variant='contained'
							onClick={handleOpenModal}
							className='primary-button'
						>
							Add Skills
						</Button>
					</div>
					{isFetching ? (
						<CircularProgress
							color='success'
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
							}}
						/>
					) : (
						<SkillTable skillList={skillList} handleEdit={handleEdit} handleDelete={handleDelete} />
					)}
				</div>
			</Grid>
			<BaseModal
				setOpen={setOpen}
				open={open}
				modalType={modalType}
				isLoading={isLoading}
				searchList={searchList}
				setSkillData={setSkillData}
				skillData={skillData}
				setTextData={setTextData}
				textData={textData}
				setSkillName={setSkillName}
				skillName={skillName}
				handleCreateSkill={handleCreateSkill}
				updateUserSkill={updateUserSkill}
				setSearchKey={setSearchKey}
				fetchSmartSearch={fetchSmartSearch}
				formik={formik}
			/>
		</div>
	) : showErrorMessage && (
		<ErrorDialog
			text={'Please Login in order to view skills'}
			buttonText={'Login'}
			navigationUrl={'/sign-in'}
			openWindowInNewTab={false}
		/>
	);
};
export default Skills;
