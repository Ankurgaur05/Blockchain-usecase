//domain model
export class Asset {
    //declaration
    constructor(
        public assetId: String,
        public participantId: String, 
        public loanAmount: String, 
        public commitAmount: String, 
        public remAMount: String, 
        public loanCurrency: String, 
        public intRate: String, 
        public assetStatus: String
    ) {


    }
}