import Company from '../models/Company.js';

export const registerCompany = async (req, res) => {
  try {
    const {
      ownerName,
      companyName,
      businessAddress,
      phoneNumber,
      city,
    } = req.body;

    const registrationCertificate = req.files?.registrationCertificate?.[0]?.filename;
    const nationalId = req.files?.nationalId?.[0]?.filename;

    if (!ownerName || !companyName || !businessAddress || !phoneNumber || !city || !registrationCertificate || !nationalId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newCompany = new Company({
      ownerName,
      companyName,
      businessAddress,
      phoneNumber,
      city,
      registrationCertificate,
      nationalId,
    });

    await newCompany.save();
    res.status(201).json({ success: true, message: 'Company registered successfully' });

  } catch (error) {
    console.error('Error registering company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    console.error('Error in getCompanies:', err);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};
