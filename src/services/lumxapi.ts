import axios from "axios";

const LUMX_URL_BASE = `${process.env.LUMX_URL_BASE}`;

const LUMX_API_KEY = `${process.env.LUMX_API_KEY}`;

const LUMX_WALLET_ID = `${process.env.LUMX_WALLET_ID}`;

const LUMX_CONTRACT_ID = `${process.env.LUMX_CONTRACT_ID}`;

export enum BlockchainNameEnum {
    SELECT = "Choose Blockchain",
    ETHEREUM = "Ethereum",
    POLYGON = "Polygon",
    CHILIZ = "Chiliz",
    OPTIMISM = "Optimism",
    LINEA = "Linea"
}

export enum ContractTypeEnum {
    SELECT = "Choose type",
    FUNGIBLE = "fungible",
    NON_FUNGIBLE = "non_fungible",
}

export type ErrorResponse = {
    message: string;
    status: number;
}

export type NewProject = {
    name?: string;
    blockchainName?: string;
}

export type ProjectResponse = {
    id: string;
    name: string;
    blockchainName: string;
    blockchainDecimalChainId: number;
    createdAt: string;
    updatedAt: string;
    apiKey: string;
}

export type NewWallet = {
    apiKey?: string;
}
export type WalletResponse = {
    id: string;
    address: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
    blockExplorerUrl: string;
}

export type ProjectAndWalletResponse ={
    projectResponse: ProjectResponse;
    walletResponse: WalletResponse;
}

export type NewContract = {    
    apiKey?: string,
    name?: string,
    symbol?: string,
    description?: string,
    type?: string,
}

export type ContractResponse = {   
    id: string,
    type: string,
    address: string,
    name: string,
    symbol: string,
    description: string,
    blockchainName: string,
    baseUri: string,
    blockExplorerUrl: string,
    createdAt: string,
    updatedAt: string,
    deployedAt: string
}

export type NewDeploy = {    
    apiKey?: string,
    contractId?: string,
}

export type TokenResponse = {
    uriNumber: number,
    contractId: string,
    name: string,
    description: string,
    maxSupply: number,
    currentSupply: number,
    traits: string,
    imageUrl: string,
    metadataUrl: string,
    createdAt: string,
    updatedAt: string
}
export type NewToken = {
    apiKey?: string,
    contractId?: string,
    name?: string,
    description?: string,
    maxSupply?: string,
    traits?: string,
    imageUrl?: string
}

export type MintResponse = {
    id: number,
    walletId: string,
    type: string,
    status: string,
    transactionHash: string,
    result: string,
    createdAt: string,
    updatedAt: string,
    completedAt: string,
    blockExplorerUrl: string,
    tokenId: string
}

export type NewMint = {
    apiKey?: string,
    contractId?: string,
    walletId?: string,
    quantity?: string,
    uriNumber?: string,
}

export type NewMintContact = {
    apiKey?: string,
    contractId?: string,
    walletId?: string,
    quantity?: string,
    uriNumber?: string,
    name?: string,
    email?: string,
    empresa?: string,
    cargo?: string
}

export type NewCustomTransaction = {
    apiKey?: string,
    walletId?: string,
    contractAddress?: string,
    functionSignature?: string,
    argumentsValues?: string,
    messageValue?: number
}

export type CustomTransactionResponse = {
    id: string,
    walletId: string,
    status: string,
    transactionHash: string,
    blockExplorerUrl: string,
    result: string,
    request: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    completedAt: string,
}
export async function connectWallet(): Promise<WalletResponse>{
    
    try {
        const walletResponse = await createWallet(LUMX_API_KEY);
        return walletResponse;
    } catch (error) {
        console.error("Error creating: ", error);
        throw new Error("Error creating wallet: " + error);
    }
}

export async function createProject(project: NewProject): Promise<ProjectResponse> {
    if (!project.name || !project.blockchainName)
        throw new Error("All fields are required.");

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "name": project.name,
            "blockchainName": project.blockchainName,
        })
    };

    const projectResponse = await fetch(`${LUMX_URL_BASE}/projects/auth`, options)
    .then(response => response.json())
    .catch(err => {
        throw "Error creating Project Lumx: "+ err;
    });
    return projectResponse;        
}

export async function createWallet(apiKey: string): Promise<WalletResponse> {

    const options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiKey
        }
    };
    
    const walletResponse = fetch(LUMX_URL_BASE+'/wallets', options)
     .then(response => response.json())
     .catch(err => {
         throw "Error creating Wallet Lumx: "+ err;
     });
    return walletResponse;
 }

 export async function createProjectAndWallet(project: NewProject): Promise<ProjectAndWalletResponse> {
    if (!project.name || !project.blockchainName) {
        throw new Error("All fields are required.");
    }

    try {
        const projectResponse = await createProject(project);
        const walletResponse = await createWallet(projectResponse.apiKey);

        const projectFinal = {
            projectResponse: projectResponse,
            walletResponse: walletResponse
        } as ProjectAndWalletResponse;

        return projectFinal;
    } catch (err) {
        throw new Error("Error creating Project and Wallet Lumx: " + err);
    }
}

export async function createContract(contract: NewContract): Promise<ContractResponse>{
    
    if (!contract.apiKey || !contract.name || !contract.symbol || !contract.description || !contract.type)
        throw new Error("All fields are required.");

    const body =  {
        "name": contract.name,
        "symbol": contract.symbol,
        "description": contract.description,
        "type": contract.type,
     };
     
    const options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+contract.apiKey
        },
        body: JSON.stringify(body)
    };

    const contractResponse = await fetch(`${LUMX_URL_BASE}/contracts`, options)
    .then(response => response.json())
    .catch(err => {
        throw "Error creating Contract Lumx: "+ err;
    });
    return contractResponse; 
}


export async function deployContract(deploy: NewDeploy): Promise<ContractResponse> {
    if (!deploy.apiKey || !deploy.contractId) {
        throw new Error("All fields are required.");
    }

    const options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deploy.apiKey}`
        },
    };

    let contractResponse: ContractResponse;

    try {
        const response = await axios.post(`${LUMX_URL_BASE}/contracts/${deploy.contractId}/deploy`, null, options);
        contractResponse = response.data;

        const pollingInterval  = setInterval(async () => {
            try {
                const pollingResponse = await axios.get(`${LUMX_URL_BASE}/contracts/${deploy.contractId}`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${deploy.apiKey}`
                    },
                });
                const pollingResult = pollingResponse.data;
                
                if (pollingResult && pollingResult.id && pollingResult.address) {
                    contractResponse.address = pollingResult.address;  
                    clearInterval(pollingInterval ); 
                }
            } catch (pollingError) {
                console.error(pollingError);
                clearInterval(pollingInterval ); 
            }
        }, 5000);
    } catch (error) {
        console.error("Error deploying Contract Lumx: " + error);
        throw new Error("Failed to deploy contract: "+ error);
    }

    return contractResponse;
}

export async function createToken(token: NewToken): Promise<TokenResponse> {

   if (!token.apiKey || !token.contractId || !token.name || !token.description || !token.maxSupply)
        throw new Error("All fields are required.");
   if(!token.traits) token.traits = "";
   if(!token.imageUrl) token.imageUrl = "";

   const body =  {
        "name": token.name,
        "description": token.description,
        "maxSupply": parseInt(token.maxSupply),
        "traits": token.traits,
        "imageUrl": token.imageUrl
     };

     const options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token.apiKey
        },
        body: JSON.stringify(body)
    };


    const tokenResponse = await fetch(`${LUMX_URL_BASE}/contracts/${token.contractId}/token-types`, options)
    .then(response => response.json())
    .catch(err => {
        throw "Error creating Token Lumx: "+ err;
    });
    return tokenResponse;  
}

export async function mintTokenEvent(walletId: string): Promise<MintResponse> {

    const data: NewMint = {
        apiKey: `${LUMX_API_KEY}`,
        contractId: `${LUMX_CONTRACT_ID}`,
        walletId: walletId,
        quantity: "1",
        uriNumber: "0",
    };

    try {
        const mintResponse = await mintToken(data);
        return mintResponse;
    } catch (error) {
        console.error("Error minting token: ", error);
        throw new Error("Error minting token: " + error);
    }
}


export async function mintToken(mint: NewMint): Promise<MintResponse> {

    if (
        !mint.apiKey || !mint.contractId || !mint.walletId ||
        !mint.quantity ||  !mint.uriNumber) {
        throw new Error("All fields are required.");
    }

    const quantity: number = parseInt(mint.quantity);
    const uriNumber: number = parseInt(mint.uriNumber);

    if (quantity <= 0 || isNaN(quantity)) {
        throw new Error('Quantity must be a positive number.');
    }
    if (isNaN(uriNumber)) {
        throw new Error('URI Number must be a valid number.');
    }

    const body = {
        contractId: mint.contractId,
        walletId: mint.walletId,
        quantity: quantity,
        uriNumber: uriNumber,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mint.apiKey}`,
        },
        data: body, 
    };

    let mintResponse: MintResponse;

    try {
        const response = await axios.post(`${LUMX_URL_BASE}/transactions/mints`, body, options);
        mintResponse = response.data;

        const pollTransaction = async (): Promise<void> => {
            while (true) {
                try {
                    const pollingResponse = await axios.get(`${LUMX_URL_BASE}/transactions/${mintResponse.id}`, {
                        headers: {
                            Authorization: `Bearer ${mint.apiKey}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const pollingResult = pollingResponse.data;

                    if (pollingResult && pollingResult.status !== "created") {

                        if(pollingResult.status === "failed"){
                            console.log("==============>"+pollingResult.result.error.errors);
                            mintResponse.result = pollingResult.result.error.errors; 
                            mintResponse.status = pollingResult.status;
                            break; 
                        }
                        else {
                            mintResponse.transactionHash = pollingResult.transactionHash;
                            mintResponse.tokenId = pollingResult.result.tokenIds[0];
                            mintResponse.status = pollingResult.status;
                            mintResponse.blockExplorerUrl = pollingResult.blockExplorerUrl;
                            mintResponse.completedAt = pollingResult.completedAt;
                            break; 
                        }
                    }

                } catch (pollingError) {
                    console.error(pollingError);
                    throw pollingError;
                }

                await new Promise(resolve => setTimeout(resolve, 5000)); 
            }
        };

        await pollTransaction(); 
    } catch (error) {
        console.error("Error minting Token Lumx: " + error);
        throw new Error("Error minting Token Lumx: " + error);
    }


    return mintResponse;
}


export async function createCustomTransaction(transaction: NewCustomTransaction): Promise<CustomTransactionResponse> {

    if (!transaction.apiKey || !transaction.walletId || !transaction.contractAddress ||
         !transaction.functionSignature )
         throw new Error("All fields are required.");   


    const walletId = transaction.walletId;
    const contractAddress = transaction.contractAddress;

    let argumentsValuesArray:(string | number)[] = [];
    if (transaction.argumentsValues) {
        argumentsValuesArray = transaction.argumentsValues.split(',').map(value => {
            const trimmedValue = value.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
            const numValue = Number(trimmedValue);
            return isNaN(numValue) ? trimmedValue : numValue;
        });
    }

    const operations = {
        operations: [
            {
                functionSignature: transaction.functionSignature,
                argumentsValues: argumentsValuesArray,
            }
        ],
        walletId,
        contractAddress
    };

      const options = {
         method: 'POST',
         headers: { 
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+transaction.apiKey
         },
         data: operations
     };

     let transactionResponse: CustomTransactionResponse;

     try {
         const response = await axios(`${LUMX_URL_BASE}/transactions/custom`, options);
         transactionResponse = response.data;
 
         const pollTransaction = async (): Promise<void> => {
             while (true) {
                 try {
                     const pollingResponse = await axios.get(`${LUMX_URL_BASE}/transactions/${transactionResponse.id}`, {
                         headers: {
                             Authorization: `Bearer ${transaction.apiKey}`,
                             'Content-Type': 'application/json',
                         },
                     });
                     const pollingResult = pollingResponse.data;
 
                     if (pollingResult && pollingResult.status !== "created") {

                         if(pollingResult.status === "failed"){
                             console.log("==============>"+pollingResult.result.error.errors);
                             transactionResponse.result = pollingResult.result.error.errors; 
                             transactionResponse.status = pollingResult.status;
                             break; 
                         }
                         else {
                            transactionResponse.transactionHash = pollingResult.transactionHash;
                            transactionResponse.status = pollingResult.status;
                            transactionResponse.blockExplorerUrl = pollingResult.blockExplorerUrl;
                            transactionResponse.completedAt = pollingResult.completedAt;
                             break; 
                         }
                     }
 
                 } catch (pollingError) {
                     console.error(pollingError);
                     throw pollingError;
                 }
 
                 await new Promise(resolve => setTimeout(resolve, 5000)); 
             }
         };
 
         await pollTransaction(); 
     } catch (error) {
         console.error("Error creating Custom Transaction Lumx: " + error);
         throw new Error("Error creating Custom Transaction Lumx: " + error);
     } 
 
     return transactionResponse;
 }

