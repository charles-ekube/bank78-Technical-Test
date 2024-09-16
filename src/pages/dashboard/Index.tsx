
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo, NaijaFlag } from '../../assets/images/Index';
import { Notification } from 'iconsax-react';
import '../../assets/styles/dashboardStyles.css'
import Text from '../../utils/CustomText';
import DocumentUploadModal from '../../components/dashboard/DocumentUploadModal';
import { useState } from 'react';

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
                    <div className={'accountCard'}>
                        <div>
                            <div >
                                <img src={NaijaFlag} alt='nigerian_flag' />
                                <Text tag={'p'}>Business Account</Text>
                            </div>
                        </div>
                    </div>
                    <div className={'transactionsCard'}>

                    </div>
                </div>
            </section>
            <DocumentUploadModal isOpen={isModalOpen} onClose={closeModal} />
        </main>
    );
}

export default Dashboard

