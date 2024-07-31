import { View, Modal, Image } from 'react-native';

const AvatarSelectModal = ({ avatars }: { avatars: string[] }) => {
  return (
    <Modal visible className="bg-[#fff]">
      {avatars.map((a) => (
        <Image source={{ uri: a }} className="w-[100px] h-[100px] bg-black" />
      ))}
    </Modal>
  );
};

export default AvatarSelectModal;
