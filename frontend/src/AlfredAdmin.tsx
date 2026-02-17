import React, { useState } from 'react';

const AlfredAdmin = () => {
    const [status, setStatus] = useState('System Standby');
    const [loading, setLoading] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setStatus(`Ingesting ${file.name}...`);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Points to your Python Brain on port 5000
            const response = await fetch('http://thefortress.shop:5000/upload_knowledge', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatus(`✅ ${file.name} successfully integrated into Core.`);
            } else {
                setStatus('❌ Ingestion Failed. Check Backend.');
            }
        } catch (error) {
            setStatus('❌ Connection Error: Brain Offline.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-gray-900 border border-blue-500 rounded-lg text-white font-mono shadow-lg">
            <h3 className="text-blue-400 mb-2">ALFRED KNOWLEDGE INGESTION</h3>
            <p className="text-xs mb-4 text-gray-400">Restricted Access: James Lambert Only</p>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 p-6 rounded-md hover:border-blue-500 transition-colors">
                <input 
                    type="file" 
                    onChange={handleUpload} 
                    className="hidden" 
                    id="file-upload"
                    disabled={loading}
                />
                <label htmlFor="file-upload" className="cursor-pointer text-center">
                    {loading ? (
                        <span className="animate-pulse text-yellow-500">SYNCHRONIZING...</span>
                    ) : (
                        <span>Drop Knowledge File Here or <span className="text-blue-500 underline">Browse</span></span>
                    )}
                </label>
            </div>
            <div className="mt-4 text-xs">
                <span className="text-gray-500">Status: </span>
                <span className={status.includes('✅') ? 'text-green-500' : 'text-blue-300'}>{status}</span>
            </div>
        </div>
    );
};

export default AlfredAdmin;
