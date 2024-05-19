import styled from 'styled-components';
import { FaCopy } from 'react-icons/fa';

export default function DummyCredentials({onCopyCredentials}){
    const credentials = [
        ['username', 'password'],
        ['user', 'password']
    ];

    const copyCredentials = (credentialIndex) =>{
      const selectedCredential = credentials[credentialIndex];
      onCopyCredentials?.(...selectedCredential);
    }

    return<Container>
        <div>Dummy Credentials</div>
        <CredentialContainer>
            {credentials.map((credential, index) => (
                <CredentialBlock key={index}>
                <CredentialRow>
                    <Label>username</Label>
                    <Separator>:</Separator>
                    <CredentialValue>{credential[0]}</CredentialValue>
                </CredentialRow>
                <CredentialRow>
                    <Label>password</Label>
                    <Separator>:</Separator>
                    <CredentialValue>{credential[1]}</CredentialValue>
                </CredentialRow>
                <CopyIcon size={10} onClick={() => copyCredentials(index)} title={'insert credential'}/>
                </CredentialBlock>
            ))}
        </CredentialContainer>
  </Container>;
}

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  position:absolute;
  top:0;
`;

const CredentialContainer = styled.div`
  margin-top: 10px;
`;

const CredentialBlock = styled.div`
  margin-bottom: 10px;
  position:relative;
  padding-right:10px;
`;

const CredentialRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width:100%;
`;

const Label = styled.span`
  margin-right: 5px;
  opacity:.8;
  font-size:.8em
`;

const Separator = styled.span`
  margin: 0 5px;
`;

const CredentialValue = styled.span`
  font-family: monospace;
  font-weight: bold;
  color: #333;
`;

const CopyIcon = styled(FaCopy)`
  margin-left: 10px;
  cursor: pointer;
  color: #666;
  position:absolute;
  right:0;
  top:50%;
  transform:translate(100%,-50%);
  &:hover {
    color: #000;
  }
`;