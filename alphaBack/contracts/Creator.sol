// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Creator {
    
    struct CreatorProfile {
        address creatorAddress;
        string name;
        string bio;
        string photoHash;
        string twitterHandle;
        string githubHandle;
        bool isRegistered;
    }

    struct Tool {
        uint256 id;
        address creator;
        string name;
        string description;
        string category;
        uint256 price; // Price in Kaia
        bool isActive;
    }

    struct ConsultationSlot {
        uint256 id;
        address creator;
        uint256 timestamp;
        bool isBooked;
    }

    struct ConsultationInfo {
        address creator;
        bool isAvailable;
        uint256 hourlyRate; 
        ConsultationSlot[] availableSlots;
    }

    struct CreatorEarnings {
        uint256 totalEarnings;
        uint256 toolSales;
        uint256 consultationRevenue;
    }

    // Mappings
    mapping(address => CreatorProfile) public creatorProfiles;
    mapping(address => Tool[]) public creatorTools;
    mapping(address => ConsultationInfo) public consultationInfos;
    mapping(address => CreatorEarnings) public creatorEarnings;
    mapping(uint256 => bool) public toolPurchases;

    // Global arrays
    address[] public registeredCreators;
    Tool[] public allTools;
    ConsultationSlot[] public allConsultationSlots;

    // Treasury management
    address public treasuryWallet;
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 5;
    uint256 public totalPlatformFees;

    // Events
    event ConsultationAvailabilitySet(address indexed creator, uint256 hourlyRate);
    event CreatorRegistered(address indexed creator, string name);
    event ToolAdded(address indexed creator, uint256 toolId, string name, uint256 price);
    event ToolPurchased(address indexed buyer, address indexed creator, uint256 toolId);
    event ConsultationSlotAdded(address indexed creator, uint256 slotId, uint256 timestamp);
    event ConsultationBooked(address indexed client, address indexed creator, uint256 slotId);
    event ProfileUpdated(address indexed creator);
    event PlatformFeeWithdrawn(address indexed to, uint256 amount);
    event TreasuryWalletUpdated(address newTreasuryWallet);

    // Modifier
    modifier onlyRegisteredCreator() {
        require(creatorProfiles[msg.sender].isRegistered, "Creator not registered");
        _;
    }

    // Constructor to set initial treasury wallet
    constructor() {
        require(msg.sender != address(0), "Invalid treasury wallet address");
        treasuryWallet = msg.sender;
    }

    // Update Treasury Wallet (only callable by current treasury wallet)
    function updateTreasuryWallet(address _newTreasuryWallet) external {
        require(msg.sender == treasuryWallet, "Only current treasury wallet can update");
        require(_newTreasuryWallet != address(0), "Invalid treasury wallet address");
        treasuryWallet = _newTreasuryWallet;
        emit TreasuryWalletUpdated(_newTreasuryWallet);
    }

    // Withdraw Platform Fees
    function withdrawPlatformFees() external {
        require(msg.sender == treasuryWallet, "Only treasury wallet can withdraw");
        uint256 feesToWithdraw = totalPlatformFees;
        require(feesToWithdraw > 0, "No fees to withdraw");
        
        // Reset total platform fees
        totalPlatformFees = 0;
        
        // Transfer fees to treasury wallet
        payable(treasuryWallet).transfer(feesToWithdraw);
        
        emit PlatformFeeWithdrawn(treasuryWallet, feesToWithdraw);
    }

    // Creator Registration
    function registerCreator(
        string memory _name, 
        string memory _bio, 
        string memory _photoHash, 
        string memory _twitterHandle, 
        string memory _githubHandle
    ) external {
        require(!creatorProfiles[msg.sender].isRegistered, "Creator already registered");
        
        creatorProfiles[msg.sender] = CreatorProfile({
            creatorAddress: msg.sender,
            name: _name,
            bio: _bio,
            photoHash: _photoHash,
            twitterHandle: _twitterHandle,
            githubHandle: _githubHandle,
            isRegistered: true
        });

        registeredCreators.push(msg.sender);
        emit CreatorRegistered(msg.sender, _name);
    }

    // Update Creator Profile
    function editProfile(
        string memory _name, 
        string memory _bio, 
        string memory _photoHash, 
        string memory _twitterHandle, 
        string memory _githubHandle
    ) external onlyRegisteredCreator {
        CreatorProfile storage profile = creatorProfiles[msg.sender];
        
        profile.name = _name;
        profile.bio = _bio;
        profile.photoHash = _photoHash;
        profile.twitterHandle = _twitterHandle;
        profile.githubHandle = _githubHandle;

        emit ProfileUpdated(msg.sender);
    }

    // Add New Tool
    function addTool(
        string memory _name, 
        string memory _description, 
        string memory _category, 
        uint256 _price
    ) external onlyRegisteredCreator {
        uint256 toolId = creatorTools[msg.sender].length;
        
        Tool memory newTool = Tool({
            id: toolId,
            creator: msg.sender,
            name: _name,
            description: _description,
            category: _category,
            price: _price,
            isActive: true
        });

        creatorTools[msg.sender].push(newTool);
        allTools.push(newTool);

        emit ToolAdded(msg.sender, toolId, _name, _price);
    }

    // Add Consultation Slot
    function addConsultationSlot(uint256 _timestamp) external onlyRegisteredCreator {
        ConsultationSlot memory newSlot = ConsultationSlot({
            id: allConsultationSlots.length,
            creator: msg.sender,
            timestamp: _timestamp,
            isBooked: false
        });

        // Add to creator's consultation info
        ConsultationInfo storage consultationInfo = consultationInfos[msg.sender];
        consultationInfo.creator = msg.sender;
        consultationInfo.availableSlots.push(newSlot);

        // Add to global consultation slots
        allConsultationSlots.push(newSlot);

        emit ConsultationSlotAdded(msg.sender, newSlot.id, _timestamp);
    }

    // Set Consultation Availability
    function setConsultationAvailability(uint256 _hourlyRate) external onlyRegisteredCreator {
        consultationInfos[msg.sender].isAvailable = true;
        consultationInfos[msg.sender].hourlyRate = _hourlyRate;

        emit ConsultationAvailabilitySet(msg.sender, _hourlyRate);
    }

    // Purchase Tool
    function purchaseTool(address _creator, uint256 _toolId) external payable {
        require(_toolId < creatorTools[_creator].length, "Invalid tool");
        Tool storage tool = creatorTools[_creator][_toolId];
        require(tool.isActive, "Tool not available");
        require(msg.value >= tool.price, "Insufficient payment");

        // Calculate platform fee (5%)
        uint256 platformFee = (tool.price * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 creatorAmount = tool.price - platformFee;

        // Record purchase
        toolPurchases[_toolId] = true;

        // Update platform fees
        totalPlatformFees += platformFee;

        // Update creator earnings
        creatorEarnings[_creator].totalEarnings += creatorAmount;
        creatorEarnings[_creator].toolSales += creatorAmount;

        // Refund excess payment
        if (msg.value > tool.price) {
            payable(msg.sender).transfer(msg.value - tool.price);
        }

        // Transfer funds to creator
        payable(_creator).transfer(creatorAmount);

        emit ToolPurchased(msg.sender, _creator, _toolId);
    }

    // Book Consultation
    function bookConsultation(address _creator, uint256 _slotId) external payable {
        require(_slotId < allConsultationSlots.length, "Invalid consultation slot");
        ConsultationSlot storage slot = allConsultationSlots[_slotId];
        
        ConsultationInfo storage consultationInfo = consultationInfos[_creator];
        
        require(slot.creator == _creator, "Slot does not belong to this creator");
        require(!slot.isBooked, "Slot already booked");
        require(consultationInfo.isAvailable, "Creator not available for consultation");
        require(msg.value >= consultationInfo.hourlyRate, "Insufficient payment");

        // Calculate platform fee (5%)
        uint256 platformFee = (msg.value * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 creatorAmount = msg.value - platformFee;

        // Mark slot as booked
        slot.isBooked = true;

        // Update platform fees
        totalPlatformFees += platformFee;

        // Update creator earnings
        creatorEarnings[_creator].totalEarnings += creatorAmount;
        creatorEarnings[_creator].consultationRevenue += creatorAmount;

        // Transfer funds to creator
        payable(_creator).transfer(creatorAmount);

        emit ConsultationBooked(msg.sender, _creator, _slotId);
    }

    // Getter Functions 
    function getCreatorProfile(address _creator) external view returns (CreatorProfile memory) {
        return creatorProfiles[_creator];
    }

    function getCreatorTools(address _creator) external view returns (Tool[] memory) {
        return creatorTools[_creator];
    }

    function getConsultationInfo(address _creator) external view returns (ConsultationInfo memory) {
        return consultationInfos[_creator];
    }

    function getCreatorEarnings(address _creator) external view returns (CreatorEarnings memory) {
        return creatorEarnings[_creator];
    }

    function getAllRegisteredCreators() external view returns (address[] memory) {
        return registeredCreators;
    }

    function getAllTools() external view returns (Tool[] memory) {
        return allTools;
    }

    function getToolsByCreator(address _creator) external view returns (Tool[] memory) {
        return creatorTools[_creator];
    }

    function getAllConsultationSlots() external view returns (ConsultationSlot[] memory) {
        return allConsultationSlots;
    }

    function getConsultationSlotsByCreator(address _creator) external view returns (ConsultationSlot[] memory) {
        ConsultationInfo storage consultationInfo = consultationInfos[_creator];
        return consultationInfo.availableSlots;
    }
    

    function getAvailableConsultationSlots() external view returns (ConsultationSlot[] memory) {
        // Count available slots
        uint256 count = 0;
        for (uint256 i = 0; i < allConsultationSlots.length; i++) {
            if (!allConsultationSlots[i].isBooked) {
                count++;
            }
        }

        // Create array of available slots
        ConsultationSlot[] memory availableSlots = new ConsultationSlot[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < allConsultationSlots.length; i++) {
            if (!allConsultationSlots[i].isBooked) {
                availableSlots[index] = allConsultationSlots[i];
                index++;
            }
        }

        return availableSlots;
    }
}