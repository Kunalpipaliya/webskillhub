const noticeModel = require("../model/notice")
const html_to_pdf = require('html-pdf-node');

exports.downloadNoticePDF = async (req, res) => {
    try {
        const notice = await noticeModel.findById(req.params.id).populate("user");

        if (!notice) return res.status(404).send("Notice not found");

        const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
              .header { text-align: center; border-bottom: 4px solid #334456; padding-bottom: 20px; margin-bottom: 30px; }
              .header h1 { color: #334456; margin: 0; font-size: 28px; letter-spacing: 2px; }
              .meta-info { display: flex; justify-content: space-between; margin-bottom: 40px; font-weight: bold; color: #555; }
              .content-box { min-height: 400px; line-height: 1.8; font-size: 16px; }
              .content-box h2 { border-left: 5px solid #334456; padding-left: 15px; color: #334456; }
              .footer { margin-top: 50px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; }
              .signature { margin-top: 30px; text-align: right; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>WEBSKILLHUB ACADEMY</h1>
              <p>Official Digital Notice Board</p>
            </div>
            
            <div class="meta-info">
              <span>Notice ID: #${notice._id.toString().slice(-6)}</span>
              <span>Date: ${new Date(notice.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
            
            <div class="content-box">
              <h2>${notice.title}</h2>
              <p>${notice.content}</p>
            </div>

            <div class="signature">
              <p><strong>Issued By:</strong><br>${notice.user ? notice.user.username : 'Administrator'}</p>
            </div>

            <div class="footer">
              <p>This is an electronically generated document. No physical signature is required.</p>
              <p>&copy; 2026 WebSkillHub - Building Skills for the Future</p>
            </div>
          </body>
        </html>
        `;

        let options = { format: 'A4', margin: { top: '20px', bottom: '20px' } };
        let file = { content: htmlContent };

        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            res.setHeader('Content-Type', 'application/pdf');
            // 'inline' shows it in browser, 'attachment' downloads it
            res.setHeader('Content-Disposition', 'inline; filename=notice.pdf');
            res.send(pdfBuffer);
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.viewNotice = async (req, res) => {
    try {
        const data = await noticeModel.find().populate("user")
        res.status(200).json({
            status: "Success",
            message: "Data Found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.createNotice = async (req, res) => {
    try {
        const data = req.body
        const notice = await noticeModel.create(data)
        res.status(201).json({
            status: "Success",
            message: "Notice created successfully",
            data: notice
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.deleteNotice = async (req, res) => {
    try {
        const id = req.params.id
        const data = await noticeModel.findByIdAndDelete(id)
        res.status(200).json({
            status: "Success",
            message: "Notice Deleted Successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.updateNotice = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const update = await noticeModel.findByIdAndUpdate(id, data,{ new: true })
        res.status(200).json({
            status: "Success",
            message: "Notice updated successfully",
            data: update
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}