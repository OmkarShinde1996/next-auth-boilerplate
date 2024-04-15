'use client'
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { UploadButton, UploadDropzone } from '@/lib/uploadthing'

const FileUpload = ({ apiEndpoint, onChange, value }) => {
    const type = value?.split('.').pop()

    if (value) {
        return (
            <div className="flex flex-col justify-center items-center space-y-2">
                {type !== 'pdf' ? (
                    <div className="relative w-40 h-40">
                        <Image
                            src={value}
                            alt="uploaded image"
                            className="object-contain rounded-lg"
                            fill
                        />
                    </div>
                ) : (
                    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                        <FileIcon />
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener_noreferrer"
                            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                        >
                            View PDF
                        </a>
                    </div>
                )}
                <Button
                    onClick={() => onChange('')}
                    variant="outline"
                    type="button"
                    className="gap-2"
                >
                    <X className="h-4 w-4" />
                    Remove Image
                </Button>
            </div>
        )
    }
    return (
        <div className="w-full p-3 rounded-md border border-dashed border-primary/40 bg-muted/30">
            <UploadButton
                className="text-sm uploadBtn"
                endpoint={apiEndpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error) => {
                    console.log(error);
                }}
            />
        </div>
    )
}

export default FileUpload

// ut-button:bg-primary/50 ut-button:ut-ready:bg-primary