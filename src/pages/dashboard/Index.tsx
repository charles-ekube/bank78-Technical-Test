
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo, NaijaFlag, NairaIcon } from '../../assets/images/Index';
import { Notification } from 'iconsax-react';
import '../../assets/styles/dashboardStyles.css'
import Text from '../../utils/CustomText';
import DocumentUploadModal from '../../components/dashboard/DocumentUploadModal';
import { useState } from 'react';
import CustomButton from '../../utils/CustomButton';

const Dashboard = () => {
    const { currentUser } = useAuth();
    console.log(currentUser, 'user')
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = () => { setModalOpen(true); }
    const closeModal = () => { setModalOpen(false); }

    const firstInitial = currentUser?.firstName.charAt(0).toUpperCase();
    const lastInitial = currentUser?.lastName.charAt(0).toUpperCase();

    const handleLogout = () => {
        // logout();
        navigate('/');
    };

    const renderNotificationBar = () => {
        if (currentUser?.uploadedFiles?.length === 0) {
            return (
                <div className={'notificationBar'}>
                    <Text tag={'p'}>
                        <strong> Verify your account!</strong> Enjoy all the benefits of Bank 78 when you fully verify
                    </Text>
                    <button onClick={openModal}>
                        <Text tag={'p'}>
                            Tap to proceed
                        </Text>
                    </button>
                </div>
            )
        }
    }

    return (
        <main>
            <nav className={'dashNav'}>
                <div>
                    <img src={Logo} alt='bank78_logo' />
                </div>
                <div className={'dashNavRightContainer'}>
                    <div>
                        <Notification size="26" color="#000" />
                    </div>
                    <div className={'navAvatarContainer'}>
                        <Text tag={'p'}>{firstInitial}{lastInitial}</Text>
                    </div>
                </div>
            </nav>
            <section className={'dashboardContainer'}>
                {renderNotificationBar()}
                <header>
                    <div>
                        <Text tag={'h4'}>  Hello {currentUser?.firstName} {currentUser?.lastName}!</Text>
                    </div>
                    <div >
                        <Text tag={'p'}>
                            Here’s an overview of your finances and transactions
                        </Text>
                    </div>
                </header>

                <div className={'cardsGrid'}>
                    <div>
                        <div className={'accountCard'}>
                            <div className={'flexRow alignCenter gap16 mb-10'}>
                                <img src={NaijaFlag} alt='nigerian_flag' />
                                <Text tag={'p'} color='rgb(119, 119, 122)' fs='12px'>Business Account</Text>
                            </div>
                            <div className={'flexRow alignCenter gap16 mb-10'}>
                                <img src={NairaIcon} alt='naira_icon' />
                                <Text tag={'p'} fs='18' fw={700} >0.00</Text>
                            </div>
                            <div className='mb-10'>
                                <Text tag={'p'} fs="13px" color="#003464"><strong>Last updated 14 minutes ago</strong></Text>
                            </div>
                            <div className={'flexRow alignCenter gap16'}>
                                <CustomButton title='Fund' className='accountCardButton' style={{ backgroundColor: 'rgb(74, 145, 243)' }} />
                                <CustomButton title='Send' className='accountCardButton' style={{ backgroundColor: 'rgb(171, 171, 175);' }} />
                            </div>
                        </div>
                        <div className={'transactionsCard'}>
                            <header className={'flexRow alignCenter justifyBetween'}>
                                <Text tag={'h3'} fs='20px' fw={700} color='#000'> Recent Transaction</Text>
                                <Text tag={'p'} fs='16' color='rgb(74, 145, 243)' >View all</Text>
                            </header>
                            <div>
                                <Text tag={'p'} fs='14px'>No recent transactions yet for this account. Use an action card above to perform a transaction.</Text>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>

                </div>
            </section>
            <DocumentUploadModal isOpen={isModalOpen} onClose={closeModal} />
        </main>
    );
}

export default Dashboard

