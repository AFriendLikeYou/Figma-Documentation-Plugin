// This shows the HTML page in "ui.html".
figma.showUI(
    `
  <style>
  body {
    font-family: Inter, sans-serif;
    margin: 0;
    padding: 16px;
  }
  h2 {
    margin-top: 0;
    font-size: 16px;
    font-weight: 600;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 320px;
  }
  .selection-container {
    background-color: #f5f5f5;
    padding: 12px;
    border-radius: 6px;
  }
  .selection-title {
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 14px;
  }
  .selection-list {
    max-height: 120px;
    overflow-y: auto;
    font-size: 12px;
    margin: 0;
    padding-left: 16px;
  }
  .selection-empty {
    font-size: 12px;
    color: #888;
  }
  .refresh-button {
    margin-top: 8px;
    font-size: 12px;
    background-color: #e0e0e0;
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .refresh-button:hover {
    background-color: #d0d0d0;
  }
  .info-text {
    font-size: 12px;
    line-height: 1.5;
  }
  .export-button {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    background-color: #18a0fb;
    color: white;
  }
  .export-button:hover {
    background-color: #0d8ee9;
  }
  .export-button:disabled {
    background-color: #cccccc;
    color: #888888;
    cursor: not-allowed;
  }
  .status-message {
    margin-top: 8px;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
  }
  .status-success {
    background-color: #e3f5e9;
    color: #0c6b39;
  }
  .status-error {
    background-color: #ffebee;
    color: #c62828;
  }
  .tabs {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 16px;
  }
  .tab {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    border-bottom: 2px solid transparent;
  }
  .tab.active {
    border-bottom-color: #18a0fb;
    color: #18a0fb;
    font-weight: 500;
  }
  .tab-content {
    display: none;
  }
  .tab-content.active {
    display: block;
  }
  .form-group {
    margin-bottom: 12px;
  }
  .form-group label {
    display: block;
    font-size: 12px;
    margin-bottom: 4px;
    font-weight: 500;
  }
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 12px;
    box-sizing: border-box;
  }
  .progress-container {
    margin-top: 12px;
    display: none;
  }
  .progress-bar {
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background-color: #18a0fb;
    width: 0%;
    transition: width 0.3s ease;
  }
  .progress-text {
    font-size: 11px;
    color: #888;
    margin-top: 4px;
  }
  </style>
  
  <div class="container">
    <h2>MDX Documentation Exporter</h2>
  
    <div class="selection-container">
      <div class="selection-title">Selected Frames (<span id="frame-count">0</span>)</div>
      <ul id="selection-list" class="selection-list"></ul>
      <div id="selection-empty" class="selection-empty">No frames selected. Select frames in Figma to export.</div>
      <button id="refresh-button" class="refresh-button">Refresh Selection</button>
    </div>
  
    <div class="tabs">
      <div class="tab active" data-tab="clipboard">Clipboard</div>
      <div class="tab" data-tab="github">GitHub</div>
    </div>
  
    <div class="tab-content active" id="clipboard-tab">
      <p class="info-text">
        This plugin will export any elements named "Image", "Headlines", "Sublines", "Alert" elements, 
        and "DoDontGroup" patterns from the selected frames into MDX-compatible format.
      </p>
      
      <button id="export-clipboard-button" class="export-button" disabled>Export MDX</button>
      
      <div id="mdx-content-container" style="display: none; margin-top: 12px;">
        <p class="info-text">MDX content ready! Copy from below:</p>
        <textarea id="mdx-content" style="width: 100%; height: 120px; margin-top: 8px; padding: 8px; font-family: monospace; font-size: 11px; border: 1px solid #e0e0e0; border-radius: 4px; resize: vertical;"></textarea>
        <button id="copy-mdx-button" class="refresh-button" style="margin-top: 8px; width: 100%;">Copy to Clipboard</button>
      </div>
    </div>
  
    <div class="tab-content" id="github-tab">
      <p class="info-text">
        Upload MDX content and images directly to your GitHub repository.
      </p>
  
      <div class="form-group">
        <label for="github-token">GitHub Token</label>
        <input type="password" id="github-token" placeholder="Personal access token">
      </div>
  
      <div class="form-group">
        <label for="github-owner">Repository Owner</label>
        <input type="text" id="github-owner" placeholder="e.g., username or organization">
      </div>
  
      <div class="form-group">
        <label for="github-repo">Repository Name</label>
        <input type="text" id="github-repo" placeholder="e.g., my-project">
      </div>
  
      <div class="form-group">
        <label for="github-branch">Branch</label>
        <input type="text" id="github-branch" placeholder="e.g., main" value="main">
      </div>
  
      <div class="form-group">
        <label for="github-path">Content Path</label>
        <input type="text" id="github-path" placeholder="e.g., content/docs" value="content/docs">
      </div>
  
      <div class="form-group">
        <label for="github-image-path">Images Path</label>
        <input type="text" id="github-image-path" placeholder="e.g., public/images" value="public/images">
      </div>
  
      <button id="export-github-button" class="export-button" disabled>Upload to GitHub</button>
  
      <div class="progress-container" id="github-progress">
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill"></div>
        </div>
        <div class="progress-text" id="progress-text">Preparing files...</div>
      </div>
    </div>
    
    <div id="status-message" class="status-message" style="display: none;"></div>
  </div>
  
  <script>
  // Selected frames
  let selectedFrames = [];
  let isExporting = false;
  let exportedData = null;
  
  // UI elements
  const frameCountEl = document.getElementById('frame-count');
  const selectionListEl = document.getElementById('selection-list');
  const selectionEmptyEl = document.getElementById('selection-empty');
  const refreshButtonEl = document.getElementById('refresh-button');
  const exportClipboardButtonEl = document.getElementById('export-clipboard-button');
  const exportGithubButtonEl = document.getElementById('export-github-button');
  const statusMessageEl = document.getElementById('status-message');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const progressContainer = document.getElementById('github-progress');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  // GitHub form elements
  const githubTokenEl = document.getElementById('github-token');
  const githubOwnerEl = document.getElementById('github-owner');
  const githubRepoEl = document.getElementById('github-repo');
  const githubBranchEl = document.getElementById('github-branch');
  const githubPathEl = document.getElementById('github-path');
  const githubImagePathEl = document.getElementById('github-image-path');
  
  // Update the UI with selected frames
  function updateSelectionUI() {
    frameCountEl.textContent = selectedFrames.length;
    
    if (selectedFrames.length > 0) {
      selectionListEl.innerHTML = '';
      selectedFrames.forEach(frame => {
        const li = document.createElement('li');
        li.textContent = frame;
        selectionListEl.appendChild(li);
      });
      
      selectionListEl.style.display = 'block';
      selectionEmptyEl.style.display = 'none';
      exportClipboardButtonEl.disabled = false;
      exportGithubButtonEl.disabled = false;
    } else {
      selectionListEl.style.display = 'none';
      selectionEmptyEl.style.display = 'block';
      exportClipboardButtonEl.disabled = true;
      exportGithubButtonEl.disabled = false;
    }
  }
  
  // Show status message
  function showStatus(message, isError = false) {
    statusMessageEl.textContent = message;
    statusMessageEl.className = isError 
      ? 'status-message status-error' 
      : 'status-message status-success';
    statusMessageEl.style.display = 'block';
  }
  
  // Hide status message
  function hideStatus() {
    statusMessageEl.style.display = 'none';
  }
  
  // Update progress bar
  function updateProgress(percent, message) {
    progressFill.style.width = percent + '%';
    progressText.textContent = message;
  }
  
  // Show progress bar
  function showProgress() {
    progressContainer.style.display = 'block';
    updateProgress(0, 'Preparing files...');
  }
  
  // Hide progress bar
  function hideProgress() {
    progressContainer.style.display = 'none';
  }
  
  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active content
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(tabName + '-tab').classList.add('active');
    });
  });
  
  // Setup message handler from the plugin code
  window.onmessage = (event) => {
    const message = event.data.pluginMessage
  
    if (message.type === "selectionChange") {
      selectedFrames = message.frames
      updateSelectionUI()
    } else if (message.type === "exportComplete") {
      // New data structure: message.data.mdxOutputs is an array
      // message.data.allImages is an array
      exportedData = message.data
      showStatus("Export complete! MDX content ready.")
      isExporting = false
      exportClipboardButtonEl.disabled = false
      exportClipboardButtonEl.textContent = "Copy to Clipboard"
      exportGithubButtonEl.disabled = false
      exportGithubButtonEl.textContent = "Upload to GitHub"
    } else if (message.type === "exportError") {
      showStatus("Error: " + message.error, true)
      isExporting = false
      exportClipboardButtonEl.disabled = false
      exportClipboardButtonEl.textContent = "Copy to Clipboard"
      exportGithubButtonEl.disabled = false
      exportGithubButtonEl.textContent = "Upload to GitHub"
    } else if (message.type === "githubProgress") {
      updateProgress(message.percent, message.message)
    } else if (message.type === "githubComplete") {
      hideProgress()
      showStatus("Successfully uploaded to GitHub!")
      isExporting = false
      exportGithubButtonEl.disabled = false
      exportGithubButtonEl.textContent = "Upload to GitHub"
    } else if (message.type === "githubError") {
      hideProgress()
      showStatus("GitHub Error: " + message.error, true)
      isExporting = false
      exportGithubButtonEl.disabled = false
      exportGithubButtonEl.textContent = "Upload to GitHub"
    } else if (message.type === "clipboardContent") {
      const mdxContentEl = document.getElementById("mdx-content")
      const mdxContentContainer = document.getElementById("mdx-content-container")
  
      if (mdxContentEl && mdxContentContainer) {
        mdxContentEl.value = message.content
        mdxContentContainer.style.display = "block"
  
        // Focus and select the content for easy copying
        setTimeout(() => {
          mdxContentEl.focus()
          mdxContentEl.select()
        }, 100)
      }
    }
  }
  
  // Initial request for selection
  parent.postMessage({ pluginMessage: { type: 'getSelection' } }, '*');
  
  // Event listeners
  refreshButtonEl.addEventListener('click', () => {
    parent.postMessage({ pluginMessage: { type: 'getSelection' } }, '*');
  });
  
  exportClipboardButtonEl.addEventListener('click', () => {
    if (isExporting) return;
    
    isExporting = true;
    exportClipboardButtonEl.disabled = true;
    exportClipboardButtonEl.textContent = 'Exporting...';
    hideStatus();
    
    parent.postMessage({ pluginMessage: { type: 'export', target: 'clipboard' } }, '*');
  });
  
  exportGithubButtonEl.addEventListener('click', () => {
    if (isExporting) return;
    
    // Validate GitHub inputs
    const token = githubTokenEl.value.trim();
    const owner = githubOwnerEl.value.trim();
    const repo = githubRepoEl.value.trim();
    const branch = githubBranchEl.value.trim();
    const path = githubPathEl.value.trim();
    const imagePath = githubImagePathEl.value.trim();
    
    if (!token || !owner || !repo || !branch) {
      showStatus('Please fill in all GitHub fields', true);
      return;
    }
    
    isExporting = true;
    exportGithubButtonEl.disabled = true;
    exportGithubButtonEl.textContent = 'Uploading...';
    hideStatus();
    showProgress();
    
    // If we already have exported data, use it directly
    if (exportedData) {
      parent.postMessage({ 
        pluginMessage: { 
          type: 'uploadToGitHub',
          token,
          owner,
          repo,
          branch,
          path,
          imagePath,
          data: exportedData
        } 
      }, '*');
    } else {
      // Otherwise, export first then upload
      parent.postMessage({ 
        pluginMessage: { 
          type: 'export', 
          target: 'github',
          githubConfig: {
            token,
            owner,
            repo,
            branch,
            path,
            imagePath
          }
        } 
      }, '*');
    }
  });
  
  const copyMdxButton = document.getElementById('copy-mdx-button');
  if (copyMdxButton) {
    copyMdxButton.addEventListener('click', () => {
      const mdxContentEl = document.getElementById('mdx-content');
      if (mdxContentEl) {
        mdxContentEl.select();
        document.execCommand('copy');
        showStatus('Copied to clipboard!');
      }
    });
  }
  </script>
  `,
    { width: 360, height: 600 },
  )
  
  // Update the UI with the current selection
  function updateSelection() {
    const selection = figma.currentPage.selection
    const frameNames = selection.filter((node) => node.type === "FRAME").map((node) => node.name)
  
    figma.ui.postMessage({
      type: "selectionChange",
      frames: frameNames,
    })
  }
  
  // Listen for selection changes in Figma
  figma.on("selectionchange", () => {
    updateSelection()
  })
  
  // Replace the getHeadingLevel function with this new version that determines heading level from the element name
  function getHeadingLevel(nodeName) {
    // Determine heading level based on the element name
    if (nodeName.includes("Headline-H1")) {
      return 1 // H1
    } else if (nodeName.includes("Headline-H2")) {
      return 2 // H2
    } else if (nodeName.includes("Headline-H3")) {
      return 3 // H3
    } else if (nodeName.includes("Headline-H4")) {
        return 4 // H4
    } else if (nodeName.includes("Headline-H5")) {
        return 5 // H5
    } else {
      // Default to H1 for any other headline
      return 1
    }
  }
  
  // Process a single frame and extract its content
  async function processFrame(frame) {
    const frameData = {
      name: frame.name,
      images: [],
      headlines: [],
      sublines: [],
      alerts: [], // Add alerts array to store alert elements
      doDontGroups: [], // Add doDontGroups array to store Do/Don't patterns
      elements: [], // Initialize the elements array to track the order
    }
  
    // Recursive function to traverse the node tree
    async function traverseNode(node) {
      // First check the node itself
      // Check if the node matches our criteria
      if (node.name === "Image") {
        try {
          // Export the image regardless of node type (RECTANGLE, FRAME, COMPONENT, INSTANCE, GROUP, etc.)
          const imageBytes = await node.exportAsync({
            format: "PNG",
            constraint: { type: "SCALE", value: 2 },
          })
  
          // Get the index for this image
          const imageIndex = frameData.images.length
  
          // Create a unique name for the image
          const imageName = `${frame.name.toLowerCase().replace(/\s+/g, "-")}-image-${imageIndex}.png`
  
          // Store the image data for later upload
          frameData.images.push({
            name: imageName,
            data: imageBytes,
            width: node.width,
            height: node.height,
            frameName: frame.name,
            index: imageIndex,
            nodeType: node.type, // Store the node type for debugging
          })
  
          // Add the element to the elements array
          frameData.elements.push({
            type: "image",
            id: node.id,
            y: node.y,
            absolutePosition: node.absoluteTransform[1][2], // Y position in absolute coordinates
            imageIndex: imageIndex,
            width: node.width,
            height: node.height,
          })
  
          figma.notify(`Exported ${node.type} named "Image"`)
        } catch (error) {
          console.error(`Failed to export node ${node.id} as image: ${error.message}`)
          figma.notify(`Failed to export ${node.type} named "Image": ${error.message}`, { error: true })
          // Continue with other nodes even if this one fails
        }
      } else if (node.name === "DoDontGroup") {
        // Process DoDontGroup elements
        let doElement = null;
        let dontElement = null;
        
        // Find the Do and Dont elements within the group
        if ("children" in node) {
          for (const child of node.children) {
            if (child.name === "Do") {
              doElement = child;
            } else if (child.name === "Dont") {
              dontElement = child;
            }
          }
        }
        
        // Only process if we found both Do and Dont elements
        if (doElement && dontElement) {
          // Process Do element
          const doData = await processDoDontElement(doElement, "do");
          
          // Process Dont element
          const dontData = await processDoDontElement(dontElement, "dont");
          
          // Add the DoDontGroup to the doDontGroups array
          const doDontIndex = frameData.doDontGroups.length;
          frameData.doDontGroups.push({
            do: doData,
            dont: dontData,
            id: node.id
          });
          
          // Add the DoDontGroup to the elements array
          frameData.elements.push({
            type: "doDontGroup",
            id: node.id,
            y: node.y,
            absolutePosition: node.absoluteTransform[1][2],
            doDontIndex: doDontIndex
          });
          
          figma.notify(`Exported DoDontGroup with Do and Dont elements`);
        }
      } else if (node.name.includes("Alert")) {
        // Process Alert elements
        // Determine the alert type based on the name
        let alertType = "Default";
        if (node.name.includes("Warning")) {
          alertType = "Warning";
        }
        
        // Get text content from child text nodes
        let headline = "";
        let subline = "";
        
        if ("children" in node) {
          for (const child of node.children) {
            if (child.type === "TEXT") {
              if (child.name.toLowerCase().includes("headline")) {
                headline = child.characters;
              } else if (child.name.toLowerCase().includes("subline")) {
                subline = child.characters;
              }
            }
          }
        }
        
        // Add the alert to the alerts array
        const alertIndex = frameData.alerts.length;
        frameData.alerts.push({
          type: alertType,
          headline: headline,
          subline: subline,
          id: node.id
        });
        
        // Add the alert to the elements array
        frameData.elements.push({
          type: "alert",
          id: node.id,
          y: node.y,
          absolutePosition: node.absoluteTransform[1][2],
          alertIndex: alertIndex,
          alertType: alertType
        });
        
        figma.notify(`Exported Alert (${alertType}): "${headline.substring(0, 20)}${headline.length > 20 ? "..." : ""}"`)
      } else if (node.type === "TEXT") {
        // More flexible headline detection - check if the name contains "headline" or "Headline" or is exactly "Headlines"
        if (node.name.toLowerCase().includes("headline") || node.name === "Headlines") {
          // Get the heading level based on the element name
          const headingLevel = getHeadingLevel(node.name)
  
          // Add the headline to the elements array
          frameData.elements.push({
            type: "headline",
            id: node.id,
            text: node.characters,
            y: node.y,
            absolutePosition: node.absoluteTransform[1][2], // Y position in absolute coordinates
            fontSize: node.fontSize || 24, // Still store fontSize for reference
            headingLevel: headingLevel, // Store the heading level
          })
  
          frameData.headlines.push({
            id: node.id,
            text: node.characters,
            headingLevel: headingLevel,
          })
  
          figma.notify(
            `Exported H${headingLevel} headline: "${node.characters.substring(0, 20)}${
              node.characters.length > 20 ? "..." : ""
            }"`,
          )
        }
        // More flexible subline detection - check if the name contains "subline" or "Subline" or is exactly "Sublines"
        else if (node.name.toLowerCase().includes("subline") || node.name === "Sublines") {
          // Add the subline to the elements array
          frameData.elements.push({
            type: "subline",
            id: node.id,
            text: node.characters,
            y: node.y,
            absolutePosition: node.absoluteTransform[1][2], // Y position in absolute coordinates
          })
  
          frameData.sublines.push({
            id: node.id,
            text: node.characters,
          })
  
          figma.notify(
            `Exported subline: "${node.characters.substring(0, 20)}${node.characters.length > 20 ? "..." : ""}"`,
          )
        }
      }
  
      // Then check all children if they exist
      if ("children" in node) {
        for (const child of node.children) {
          await traverseNode(child)
        }
      }
    }
    
    // Helper function to process Do and Dont elements
    async function processDoDontElement(element, type) {
      let title = "";
      let text = "";
      let imageData = null;
      let imageNode = null;
      
      // Extract title, text, and image from the element
      if ("children" in element) {
        for (const child of element.children) {
          if (child.type === "TEXT") {
            if (child.name.toLowerCase().includes("title")) {
              title = child.characters;
            } else if (child.name.toLowerCase().includes("text")) {
              text = child.characters;
            }
          } else if (child.name === "Image" || child.type === "RECTANGLE" || child.type === "FRAME") {
            // This could be an image
            imageNode = child;
          }
        }
      }
      
      // Export the image if found
      if (imageNode) {
        try {
          const imageBytes = await imageNode.exportAsync({
            format: "PNG",
            constraint: { type: "SCALE", value: 2 },
          });
          
          // Create a unique name for the image
          const imageName = `${frame.name.toLowerCase().replace(/\s+/g, "-")}-${type}-${frameData.images.length}.png`;
          
          // Store the image data
          imageData = {
            name: imageName,
            data: imageBytes,
            width: imageNode.width,
            height: imageNode.height,
            index: frameData.images.length
          };
          
          // Add to the images array
          frameData.images.push({
            name: imageName,
            data: imageBytes,
            width: imageNode.width,
            height: imageNode.height,
            frameName: frame.name,
            index: frameData.images.length,
            nodeType: imageNode.type
          });
        } catch (error) {
          console.error(`Failed to export image for ${type}: ${error.message}`);
        }
      }
      
      return {
        title: title,
        text: text,
        image: imageData
      };
    }
  
    // Start traversal from the frame
    await traverseNode(frame)
  
    // Sort elements by their vertical position
    frameData.elements.sort((a, b) => a.absolutePosition - b.absolutePosition)
  
    return frameData
  }
  
  // Debug function to log the structure of frames and elements
  function debugFrameData(framesData) {
    console.log("=== DEBUG: Frame Data ===")
  
    framesData.forEach((frame, frameIndex) => {
      console.log(`Frame ${frameIndex + 1}: ${frame.name}`)
      console.log(`  Headlines: ${frame.headlines.length}`)
      console.log(`  Sublines: ${frame.sublines.length}`)
      console.log(`  Images: ${frame.images.length}`)
      console.log(`  Alerts: ${frame.alerts.length}`)
      console.log(`  DoDontGroups: ${frame.doDontGroups.length}`) // Add DoDontGroups debugging
      console.log(`  Elements in order: ${frame.elements.length}`)
  
      frame.elements.forEach((element, elementIndex) => {
        console.log(`    Element ${elementIndex + 1}: ${element.type} at Y=${element.absolutePosition}`)
        if (element.type === "headline") {
          console.log(
            `      H${element.headingLevel} (${element.fontSize}px): "${element.text.substring(0, 30)}${
              element.text.length > 30 ? "..." : ""
            }"`,
          )
        } else if (element.type === "subline") {
          console.log(`      Text: "${element.text.substring(0, 30)}${element.text.length > 30 ? "..." : ""}"`)
        } else if (element.type === "image") {
          console.log(`      Image index: ${element.imageIndex}`)
        } else if (element.type === "alert") {
          console.log(`      Alert type: ${element.alertType}, index: ${element.alertIndex}`)
        } else if (element.type === "doDontGroup") {
          console.log(`      DoDontGroup index: ${element.doDontIndex}`)
          const doDontGroup = frame.doDontGroups[element.doDontIndex];
          console.log(`        Do: ${doDontGroup.do.title} (has image: ${!!doDontGroup.do.image})`)
          console.log(`        Dont: ${doDontGroup.dont.title} (has image: ${!!doDontGroup.dont.image})`)
        }
      })
    })
  
    console.log("=== END DEBUG ===")
  }
  
  // Generate MDX output from the processed data
  function generateMDXOutput(framesData) {
    let mdxOutput = ""
  
    framesData.forEach((frame) => {
      mdxOutput += `## ${frame.name}\n\n`
  
      // Process elements in the order they appear in the frame
      frame.elements.forEach((element) => {
        if (element.type === "headline") {
          // Use the appropriate heading level
          const headingMarker = "#".repeat(element.headingLevel)
          mdxOutput += `${headingMarker} ${element.text}\n\n`
        } else if (element.type === "subline") {
          // Use regular paragraph text for sublines
          mdxOutput += `${element.text}\n\n`
        } else if (element.type === "image") {
          const image = frame.images[element.imageIndex]
          mdxOutput += `<Image src="/images/${image.name}" width={${element.width}} height={${element.height}} alt="Image from ${frame.name}" />\n\n`
        } else if (element.type === "alert") {
          // Add alert code blocks
          const alert = frame.alerts[element.alertIndex]
          mdxOutput += `\`\`\`jsx
<Alert variant="${element.alertType.toLowerCase()}">
  <AlertTitle>${alert.headline}</AlertTitle>
  <AlertDescription>${alert.subline}</AlertDescription>
</Alert>
\`\`\`\n\n`
        } else if (element.type === "doDontGroup") {
          // Add DoDontGroup code blocks
          const doDontGroup = frame.doDontGroups[element.doDontIndex];
          const doItem = doDontGroup.do;
          const dontItem = doDontGroup.dont;
          
          // Generate the DoDontGroup code block
          mdxOutput += `\`\`\`jsx
<DoDontGroup>
  <Do>
    ${doItem.image ? `<Image src="/images/${doItem.image.name}" width={${doItem.image.width}} height={${doItem.image.height}} alt="Do: ${doItem.title}" />` : ''}
    <DoTitle>${doItem.title}</DoTitle>
    <DoText>${doItem.text}</DoText>
  </Do>
  <Dont>
    ${dontItem.image ? `<Image src="/images/${dontItem.image.name}" width={${dontItem.image.width}} height={${dontItem.image.height}} alt="Don't: ${dontItem.title}" />` : ''}
    <DontTitle>${dontItem.title}</DontTitle>
    <DontText>${dontItem.text}</DontText>
  </Dont>
</DoDontGroup>
\`\`\`\n\n`
        }
      })
  
      mdxOutput += "---\n\n"
    })
  
    return mdxOutput
  }
  
  // Generate MDX for a single frame
  function generateSingleFrameMDXOutput(frameData) {
    let mdxOutput = ""
  
    // Process elements in the order they appear in the frame
    frameData.elements.forEach((element) => {
      if (element.type === "headline") {
        // Use the appropriate heading level
        const headingMarker = "#".repeat(element.headingLevel)
        mdxOutput += `${headingMarker} ${element.text}\n\n`
      } else if (element.type === "subline") {
        // Use regular paragraph text for sublines
        mdxOutput += `${element.text}\n\n`
      } else if (element.type === "image") {
        const image = frameData.images[element.imageIndex]
        mdxOutput += `<Image src="/images/${image.name}" width={${element.width}} height={${element.height}} alt="Image from ${frameData.name}" />\n\n`
      } else if (element.type === "alert") {
        // Add alert code blocks
        const alert = frameData.alerts[element.alertIndex]
        
        // Generate the alert code block based on type
        mdxOutput += `\`\`\`jsx
<Alert variant="${element.alertType.toLowerCase()}">
  <AlertTitle>${alert.headline}</AlertTitle>
  <AlertDescription>${alert.subline}</AlertDescription>
</Alert>
\`\`\`\n\n`
      } else if (element.type === "doDontGroup") {
        // Add DoDontGroup code blocks
        const doDontGroup = frameData.doDontGroups[element.doDontIndex];
        const doItem = doDontGroup.do;
        const dontItem = doDontGroup.dont;
        
        // Generate the DoDontGroup code block
        mdxOutput += `\`\`\`jsx
<DoDontGroup>
  <Do>
    ${doItem.image ? `<Image src="/images/${doItem.image.name}" width={${doItem.image.width}} height={${doItem.image.height}} alt="Do: ${doItem.title}" />` : ''}
    <DoTitle>${doItem.title}</DoTitle>
    <DoText>${doItem.text}</DoText>
  </Do>
  <Dont>
    ${dontItem.image ? `<Image src="/images/${dontItem.image.name}" width={${dontItem.image.width}} height={${dontItem.image.height}} alt="Don't: ${dontItem.title}" />` : ''}
    <DontTitle>${dontItem.title}</DontTitle>
    <DontText>${dontItem.text}</DontText>
  </Dont>
</DoDontGroup>
\`\`\`\n\n`
      }
    })
  
    return mdxOutput
  }
  
  // Export the selected frames to MDX
  async function exportToMDX(target, githubConfig = null) {
    try {
      const selection = figma.currentPage.selection
      const frames = selection.filter((node) => node.type === "FRAME")
  
      if (frames.length === 0) {
        throw new Error("No frames selected")
      }
  
      // Process each frame
      const framesData = []
  
      for (const frame of frames) {
        const frameData = await processFrame(frame)
        framesData.push(frameData)
      }
  
      // Debug the frame data to help diagnose issues
      debugFrameData(framesData)
  
      // Create separate MDX outputs for each frame
      const mdxOutputs = framesData.map((frameData) => {
        return {
          name: frameData.name,
          content: generateSingleFrameMDXOutput(frameData),
          images: frameData.images,
        }
      })
  
      // Handle based on target
      if (target === "clipboard") {
        // For clipboard, we'll still combine all content for convenience
        const combinedMdxOutput = mdxOutputs.map((output) => output.content).join("\n\n")
  
        try {
          // Try to use the clipboard API if available
          if (figma.clipboard) {
            figma.clipboard.writeText(combinedMdxOutput)
            figma.notify("MDX content copied to clipboard!")
          } else {
            // If clipboard API is not available, send the content to the UI
            figma.ui.postMessage({
              type: "clipboardContent",
              content: combinedMdxOutput,
            })
            figma.notify("MDX content ready! Use the copy button in the UI.")
          }
  
          figma.ui.postMessage({
            type: "exportComplete",
            data: {
              mdxOutputs: mdxOutputs,
              allImages: framesData.flatMap((frame) => frame.images),
            },
          })
        } catch (error) {
          console.error("Clipboard error:", error)
          // Fall back to UI-based copying
          figma.ui.postMessage({
            type: "clipboardContent",
            content: combinedMdxOutput,
          })
          figma.notify("Clipboard API unavailable. Use the copy button in the UI.")
  
          figma.ui.postMessage({
            type: "exportComplete",
            data: {
              mdxOutputs: mdxOutputs,
              allImages: framesData.flatMap((frame) => frame.images),
            },
          })
        }
      } else if (target === "github") {
        // Upload to GitHub - now with separate files
        await uploadToGitHub(githubConfig, mdxOutputs)
      }
    } catch (error) {
      figma.ui.postMessage({
        type: "exportError",
        error: error.message,
      })
    }
  }
  
  // Upload content to GitHub
  async function uploadToGitHub(config, mdxOutputs) {
    const { token, owner, repo, branch, path, imagePath } = config
  
    try {
      // Authentication header
      const authHeader = `Bearer ${token}`
  
      // Step 1: Get the current commit SHA
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 5,
        message: "Getting repository information...",
      })
  
      const refResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
      })
  
      if (!refResponse.ok) {
        throw new Error(`Failed to get branch reference: ${await refResponse.text()}`)
      }
  
      const refData = await refResponse.json()
      const latestCommitSha = refData.object.sha
  
      // Step 2: Get the current tree
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 10,
        message: "Getting current tree...",
      })
  
      const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, {
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
        },
      })
  
      if (!commitResponse.ok) {
        throw new Error(`Failed to get commit: ${await commitResponse.text()}`)
      }
  
      const commitData = await commitResponse.json()
      const treeSha = commitData.tree.sha
  
      // Step 3: Create blobs for all files
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 15,
        message: "Creating blobs for MDX files...",
      })
  
      // Create blobs for all MDX files
      const mdxBlobs = []
      const mdxProgressPerFile = 15 / (mdxOutputs.length || 1)
  
      for (let i = 0; i < mdxOutputs.length; i++) {
        const mdxOutput = mdxOutputs[i]
        const fileName = mdxOutput.name.toLowerCase().replace(/\s+/g, "-") + ".mdx"
  
        figma.ui.postMessage({
          type: "githubProgress",
          percent: 15 + mdxProgressPerFile * i,
          message: `Creating blob for ${fileName}...`,
        })
  
        const mdxBlobResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
          method: "POST",
          headers: {
            Authorization: authHeader,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: mdxOutput.content,
            encoding: "utf-8",
          }),
        })
  
        if (!mdxBlobResponse.ok) {
          throw new Error(`Failed to create MDX blob: ${await mdxBlobResponse.text()}`)
        }
  
        const mdxBlob = await mdxBlobResponse.json()
        mdxBlobs.push({
          blob: mdxBlob,
          name: fileName,
        })
      }
  
      // Create blobs for all images
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 30,
        message: "Creating blobs for images...",
      })
  
      const allImages = mdxOutputs.flatMap((output) => output.images)
      const imageBlobs = []
      const imageProgressPerFile = 30 / (allImages.length || 1)
  
      for (let i = 0; i < allImages.length; i++) {
        const image = allImages[i]
  
        figma.ui.postMessage({
          type: "githubProgress",
          percent: 30 + imageProgressPerFile * i,
          message: `Creating blob for image ${i + 1} of ${allImages.length}...`,
        })
  
        // Convert Uint8Array to base64 using Figma's built-in function
        const base64Data = figma.base64Encode(image.data)
  
        const imageBlobResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
          method: "POST",
          headers: {
            Authorization: authHeader,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: base64Data,
            encoding: "base64",
          }),
        })
  
        if (!imageBlobResponse.ok) {
          throw new Error(`Failed to create image blob: ${await imageBlobResponse.text()}`)
        }
  
        const imageBlob = await imageBlobResponse.json()
        imageBlobs.push({
          blob: imageBlob,
          name: image.name,
        })
      }
  
      // Step 4: Create a new tree
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 70,
        message: "Creating new tree...",
      })
  
      const treeItems = []
  
      // Add all MDX files to the tree
      mdxBlobs.forEach((mdxFile) => {
        treeItems.push({
          path: `${path}/${mdxFile.name}`,
          mode: "100644",
          type: "blob",
          sha: mdxFile.blob.sha,
        })
      })
  
      // Add all image files to the tree
      imageBlobs.forEach((image) => {
        treeItems.push({
          path: `${imagePath}/${image.name}`,
          mode: "100644",
          type: "blob",
          sha: image.blob.sha,
        })
      })
  
      const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base_tree: treeSha,
          tree: treeItems,
        }),
      })
  
      if (!treeResponse.ok) {
        throw new Error(`Failed to create tree: ${await treeResponse.text()}`)
      }
  
      const treeData = await treeResponse.json()
  
      // Step 5: Create a commit
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 85,
        message: "Creating commit...",
      })
  
      const commitMessageResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Update from Figma MDX Exporter - ${mdxBlobs.length} frames`,
          tree: treeData.sha,
          parents: [latestCommitSha],
        }),
      })
  
      if (!commitMessageResponse.ok) {
        throw new Error(`Failed to create commit: ${await commitMessageResponse.text()}`)
      }
  
      const commitMessageData = await commitMessageResponse.json()
  
      // Step 6: Update the reference
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 95,
        message: "Updating branch reference...",
      })
  
      const updateRefResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: "PATCH",
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sha: commitMessageData.sha,
          force: false,
        }),
      })
  
      if (!updateRefResponse.ok) {
        throw new Error(`Failed to update reference: ${await updateRefResponse.text()}`)
      }
  
      // Success!
      figma.ui.postMessage({
        type: "githubProgress",
        percent: 100,
        message: "Upload complete!",
      })
  
      figma.ui.postMessage({
        type: "githubComplete",
      })
  
      figma.notify(`Successfully uploaded ${mdxBlobs.length} MDX files to GitHub!`)
    } catch (error) {
      figma.ui.postMessage({
        type: "githubError",
        error: error.message,
      })
    }
  }
  
  // Handle messages from the UI
  figma.ui.onmessage = (msg) => {
    if (msg.type === "getSelection") {
      updateSelection()
    } else if (msg.type === "export") {
      exportToMDX(msg.target, msg.githubConfig)
    } else if (msg.type === "uploadToGitHub") {
      uploadToGitHub(
        {
          token: msg.token,
          owner: msg.owner,
          repo: msg.repo,
          branch: msg.branch,
          path: msg.path,
          imagePath: msg.imagePath,
        },
        msg.data.mdxOutputs || [{ name: "figma-export", content: msg.data.mdx, images: msg.data.images }],
      )
    } else if (msg.type === "resize") {
      figma.ui.resize(msg.width, msg.height)
    }
  }
