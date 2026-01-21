'use client';

import { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileUp } from 'lucide-react';
import { useImportStudents } from '../hooks/useImportStudents';
import { ImportErrorsDialog } from './ImportErrorsDialog';
import type { ImportStudentsResponse } from '../types';

export function ImportStudentsDialog() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportStudentsResponse | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: importStudents, isPending } = useImportStudents();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const validExtensions = ['.csv', '.xls', '.xlsx'];
    const fileExtension = file?.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (file && (validTypes.includes(file.type) || validExtensions.includes(fileExtension || ''))) {
      setSelectedFile(file);
    } else {
      alert('Por favor selecciona un archivo CSV o Excel válido');
      event.target.value = '';
    }
  };

  const handleImport = () => {
    if (!selectedFile) {
      return;
    }

    importStudents(selectedFile, {
      onSuccess: (data) => {
        // Cerrar dialog y resetear
        setOpen(false);
        setSelectedFile(null);

        // Reiniciar el input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Si hay errores, mostrar el diálogo de errores
        if (data.failed > 0) {
          setImportResult(data);
          setShowErrors(true);
        }
      },
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reiniciar el input para poder volver a seleccionar el mismo archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Importar Archivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Estudiantes</DialogTitle>
          <DialogDescription>
            Selecciona un archivo CSV o Excel con los datos de los estudiantes para importarlos al
            sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors">
            <FileUp className="text-muted-foreground mb-4 h-10 w-10" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={isPending}
            />
            <label
              htmlFor="file-upload"
              className="text-primary cursor-pointer text-sm font-medium hover:underline"
            >
              Haz clic para seleccionar un archivo
            </label>
            <p className="text-muted-foreground mt-2 text-xs">
              CSV o Excel (.csv, .xlsx, .xls) - Máximo 5MB
            </p>
          </div>

          {selectedFile && (
            <div className="bg-muted flex items-center gap-2 rounded-md p-3">
              <FileUp className="text-muted-foreground h-4 w-4" />
              <span className="flex-1 text-sm font-medium">{selectedFile.name}</span>
              <button
                onClick={handleRemoveFile}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                Eliminar
              </button>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancelar
            </Button>
            <Button onClick={handleImport} disabled={!selectedFile || isPending}>
              {isPending ? 'Importando...' : 'Importar'}
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Diálogo de errores */}
      {importResult && (
        <ImportErrorsDialog
          open={showErrors}
          onOpenChange={setShowErrors}
          successCount={importResult.success}
          failedCount={importResult.failed}
          errors={importResult.errors}
        />
      )}
    </Dialog>
  );
}
