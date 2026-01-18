import java.util.Scanner;
import java.io.*;

public class absensi {

    // ===== PROSEDUR =====
    static void tampilJudul() {
        System.out.println("================================");
        System.out.println("   ABSENSI MAHASISWA");
        System.out.println("================================");
    }

    static String cekKehadiran(int pilih) {
        // ===== CONDITIONAL =====
        if (pilih == 1) {
            return "Hadir";
        } else if (pilih == 2) {
            return "Izin";
        } else if (pilih == 3) {
            return "Sakit";
        } else if (pilih == 4) {
            return "Alfa";
        } else {
            return "Invalid";
        }
    }

    // ===== PROSEDUR SIMPAN KE FILE =====
    static void simpanKeFile(String[] nama, String[] nim, String[] jurusan, String[] status, int jumlah) {
        try {
            FileWriter writer = new FileWriter("absensi_mahasiswa.txt");
            BufferedWriter buffer = new BufferedWriter(writer);
            
            buffer.write("HASIL ABSENSI MAHASISWA\n");
            buffer.write("================================\n\n");
            
            for (int i = 0; i < jumlah; i++) {
                buffer.write("Mahasiswa ke-" + (i + 1) + "\n");
                buffer.write("Nama    : " + nama[i] + "\n");
                buffer.write("NIM     : " + nim[i] + "\n");
                buffer.write("Jurusan : " + jurusan[i] + "\n");
                buffer.write("Status  : " + status[i] + "\n");
                buffer.write("------------------------------\n");
            }
            
            buffer.close();
            System.out.println("\n✓ Data berhasil disimpan ke file 'absensi_mahasiswa.txt'");
        } catch (IOException e) {
            System.out.println("\n✗ Error saat menyimpan file: " + e.getMessage());
        }
    }

    // ===== PROSEDUR BACA DARI FILE =====
    static void bacaDariFile() {
        try {
            FileReader reader = new FileReader("absensi_mahasiswa.txt");
            BufferedReader buffer = new BufferedReader(reader);
            
            String line;
            System.out.println("\n=== DATA DARI FILE ===");
            while ((line = buffer.readLine()) != null) {
                System.out.println(line);
            }
            
            buffer.close();
        } catch (FileNotFoundException e) {
            System.out.println("\n✗ File tidak ditemukan. Belum ada data yang tersimpan.");
        } catch (IOException e) {
            System.out.println("\n✗ Error saat membaca file: " + e.getMessage());
        }
    }

    // ===== PROSEDUR VALIDASI INPUT ANGKA =====
    static int inputAngkaValid(Scanner input, String prompt, int min, int max) {
        int angka = -1;
        boolean valid = false;
        
        while (!valid) {
            try {
                System.out.print(prompt);
                angka = input.nextInt();
                input.nextLine(); 
                
                if (angka >= min && angka <= max) {
                    valid = true;
                } else {
                    System.out.println("✗ Input harus antara " + min + " dan " + max + "!");
                }
            } catch (Exception e) {
                System.out.println("✗ Input harus berupa angka!");
                input.nextLine(); 
            }
        }
        
        return angka;
    }

    // ===== PROSEDUR VALIDASI INPUT STRING =====
    static String inputStringValid(Scanner input, String prompt) {
        String str = "";
        boolean valid = false;
        
        while (!valid) {
            System.out.print(prompt);
            str = input.nextLine().trim();
            
            if (!str.isEmpty()) {
                valid = true;
            } else {
                System.out.println("✗ Input tidak boleh kosong!");
            }
        }
        
        return str;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        tampilJudul();

        // ===== MENU UTAMA =====
        System.out.println("\nMENU:");
        System.out.println("1. Input Data Absensi Baru");
        System.out.println("2. Lihat Data dari File");
        System.out.println("3. Keluar");
        
        int menu = inputAngkaValid(input, "Pilih menu (1-3): ", 1, 3);

        if (menu == 2) {
            bacaDariFile();
            input.close();
            return;
        } else if (menu == 3) {
            System.out.println("Terima kasih!");
            input.close();
            return;
        }

        // ===== INPUT JUMLAH MAHASISWA =====
        int jumlah = inputAngkaValid(input, "\nMasukkan jumlah mahasiswa: ", 1, 100);

        // ===== ARRAY =====
        String[] nama = new String[jumlah];
        String[] nim = new String[jumlah];
        String[] jurusan = new String[jumlah];
        String[] status = new String[jumlah];

        // ===== LOOPING INPUT =====
        for (int i = 0; i < jumlah; i++) {
            System.out.println("\n=== Mahasiswa ke-" + (i + 1) + " ===");

            nama[i] = inputStringValid(input, "Nama    : ");
            nim[i] = inputStringValid(input, "NIM     : ");
            jurusan[i] = inputStringValid(input, "Jurusan : ");

            System.out.println("\nStatus Kehadiran:");
            System.out.println("1. Hadir");
            System.out.println("2. Izin");
            System.out.println("3. Sakit");
            System.out.println("4. Alfa");
            
            int pilih = inputAngkaValid(input, "Pilih (1-4): ", 1, 4);
            status[i] = cekKehadiran(pilih);
        }

        // ===== OUTPUT =====
        System.out.println("\n================================");
        System.out.println("   HASIL ABSENSI MAHASISWA");
        System.out.println("================================");
        
        for (int i = 0; i < jumlah; i++) {
            System.out.println("\nMahasiswa ke-" + (i + 1));
            System.out.println("------------------------------");
            System.out.println("Nama    : " + nama[i]);
            System.out.println("NIM     : " + nim[i]);
            System.out.println("Jurusan : " + jurusan[i]);
            System.out.println("Status  : " + status[i]);
        }

        // ===== SIMPAN KE FILE =====
        System.out.print("\nSimpan data ke file? (y/n): ");
        String simpan = input.nextLine().toLowerCase();
        
        if (simpan.equals("y") || simpan.equals("yes")) {
            simpanKeFile(nama, nim, jurusan, status, jumlah);
        }

        input.close();
    }
}