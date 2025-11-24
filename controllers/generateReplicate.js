const Replicate = require("replicate");

// Initialize Replicate with your token
const replicate = new Replicate({
  auth: "r8_HB4Eg4JO85IUxwfcaKszG51WFP5goZI43jt5h",
});

async function generateReplicate(req, res) {
  try {
    const { modelId, versionId, prompt } = req.body;

    if (!modelId || !versionId || !prompt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log(`[Replicate] Generating with ${modelId}:${versionId}`);

    // Replicate expects "owner/name:version" format
    const modelIdentifier = `${modelId}:${versionId}`;

    const input = {
      prompt: prompt,
      aspect_ratio: "1:1", // You can make this dynamic based on your frontend width/height
      output_format: "png",
      num_outputs: 1,
      disable_safety_checker: true, // Optional, depending on your needs
    };

    // Run the model
    const output = await replicate.run(modelIdentifier, { input });

    // Replicate returns an array of output items. Usually URLs or FileOutput objects.
    // We grab the first one.
    let imageUrl = Array.isArray(output) ? output[0] : output;

    // Handle FileOutput objects if the SDK returns them
    if (imageUrl && typeof imageUrl.url === "function") {
      imageUrl = imageUrl.url();
    }

    console.log("[Replicate] Success:", imageUrl);
    res.json({ imageUrl });
  } catch (error) {
    console.error("[Replicate] Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to generate image" });
  }
}

module.exports = { generateReplicate };
