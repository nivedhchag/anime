import { useState } from 'react';

export default function AudioUpload() {
  const [audioFile, setAudioFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const res = await fetch('/api/upload/audio', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setAudioUrl(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input 
        type="file" 
        accept="audio/*" 
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={!audioFile || isUploading}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
      >
        {isUploading ? 'Uploading...' : 'Upload Audio'}
      </button>
      {audioUrl && (
        <audio controls className="w-full mt-2">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}