import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import useMessageViewModel from '../../viewModels/message.viewModel';
import { markMessagesAsSeen } from '../../store/messagesSlice';
import { fireEvent, render } from '@testing-library/react-native';
import MessagesDetail from './messaging_detail';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../viewModels/message.viewModel', () => jest.fn());
jest.mock('../../store/messagesSlice', () => ({
  markMessagesAsSeen: jest.fn(),
}));

describe('MessagesDetail', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

  const mockDispatch = jest.fn();
  const mockViewModel = {
    conversations: [],
    addMessage: jest.fn(), 
    getConversationById: jest.fn(),
  };
  

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch); // Mock `useDispatch`
    (useMessageViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('doit afficher les composants principaux', () => {
    mockViewModel.getConversationById.mockReturnValue({
        id: '1',
        contactName: 'Doe',
        contactFirstName: 'John',
        contactAvatar: null,
        id_user1: '123', 
        messages: [],
      });
      

    const { getByPlaceholderText, getByText } = render(
      <MessagesDetail route={{ params: { conversationId: '1' } }} />
    );

    expect(getByPlaceholderText('Ecrire un message...')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
  });

  // 4. Test de l'envoi d'un message
  it("doit permettre d'envoyer un message", () => {
    mockViewModel.getConversationById.mockReturnValue({
      id: "1",
      contactName: "Doe",
      contactFirstName: "John",
      contactAvatar: null,
      id_user1: "123",
      messages: [],
    });
  
    const { getByPlaceholderText, getByTestId } = render(
      <MessagesDetail route={{ params: { conversationId: "1" } }} />
    );
  
    const input = getByPlaceholderText("Ecrire un message...");
    const sendButton = getByTestId("send-button");
  
    // Simulez la saisie d'un message
    fireEvent.changeText(input, "Nouveau message");
  
    // Vérifiez que la valeur a bien changé
    expect(input.props.value).toBe("Nouveau message");
  
    // Simulez l'appui sur le bouton d'envoi
    fireEvent.press(sendButton);
  
    // Vérifiez que la fonction `addMessage` a été appelée avec les bons arguments
    expect(mockViewModel.addMessage).toHaveBeenCalledWith("1", expect.objectContaining({
      text: "Nouveau message",
      id_conversation: "1",
      id_sender: "123",
    }));
  
    // Vérifiez que le champ d'entrée a été réinitialisé
    expect(input.props.value).toBe("");
  });
  
  

  // 5. Test de `markMessagesAsSeen`
  it("doit appeler markMessagesAsSeen lors du montage", () => {
    mockViewModel.getConversationById.mockReturnValue({
      id: "1",
      contactName: "Doe",
      contactFirstName: "John",
      contactAvatar: null,
      messages: [],
    });

    render(<MessagesDetail route={{ params: { conversationId: "1" } }} />);
    expect(mockDispatch).toHaveBeenCalledWith(markMessagesAsSeen("1"));
  });

  // 6. Test de navigation vers "ContactDetail"
  it("doit naviguer vers ContactDetail lorsqu'on appuie sur les infos du contact", () => {
    mockViewModel.getConversationById.mockReturnValue({
      id: "1",
      contactName: "Doe",
      contactFirstName: "John",
      contactAvatar: null,
      messages: [],
    });

    const { getByText } = render(
      <MessagesDetail route={{ params: { conversationId: "1" } }} />
    );

    fireEvent.press(getByText("John Doe"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("ContactDetail", {
      name: "Doe",
      avatar: null,
    });
  });
});
