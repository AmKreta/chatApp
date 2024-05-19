import styled from 'styled-components';

export default function DummyCredentials(){
    const credentials = [
        ['username', 'password'],
        ['user', 'password']
    ];

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
`;

const CredentialRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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