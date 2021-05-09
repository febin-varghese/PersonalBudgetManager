import sys
import traceback
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
# User defined imports
from src.settings_file import open_settings
from src.settings_window import SettingsWindow


def exception_hook(exctype, value, traceback):
    traceback_formated = traceback.format_exception(exctype, value, traceback)
    traceback_string = "".join(traceback_formated)
    print(traceback_string, file=sys.stderr)
    sys.exit(1)


class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent=parent)
        self.settings = open_settings()
        self.settings_window = None
        # setting up window properties
        self.screen_size = QDesktopWidget().screenGeometry()
        w, h = self.screen_size.width(), self.screen_size.height()
        self.setGeometry(0.2*w, 0.15*h, 0.5*w, 0.5*h)
        self.setWindowTitle("Budget Manager")
        self.setWindowIcon(QIcon(r"..\appData\app_icon"))

        # creating QWidget as central widget and layout design
        self.main_widget = QWidget()
        self.setCentralWidget(self.main_widget)
        self.hori_layout = QHBoxLayout(self.main_widget)
        # self.ver_layout = QVBoxLayout()
        # self.hori_layout.addLayout(self.ver_layout)

        # creating menu
        self.menu_bar = self.menuBar()

        # File menu
        file_menu = self.menu_bar.addMenu("File")
        open_file = file_menu.addAction(QIcon(r"..\appData\open_icon"), "Open file")
        open_file.triggered.connect(self.browse_file)
        save_file = file_menu.addAction(QIcon(r"..\appData\save_icon"), "Save file")
        save_file.triggered.connect(self.save_file)
        exit_app = file_menu.addAction(QIcon(r"..\appData\exit_icon"), "Exit")
        exit_app.setShortcut("Ctrl+Q")
        exit_app.triggered.connect(self.exit_app)

        # Edit menu
        edit_menu = self.menu_bar.addMenu("Edit")
        change_settings = edit_menu.addAction(QIcon(r"..\appData\settings_icon"), "Settings")
        change_settings.triggered.connect(self.change_settings)

        # toolbar
        self.toolbar = self.addToolBar("Settings")
        self.toolbar.addAction(exit_app)
        self.toolbar.addAction(change_settings)

        # status bar
        self.status_bar = QStatusBar()
        self.setStatusBar(self.status_bar)
        self.status_bar.showMessage("Ready!")

        self.add_income_button = QPushButton("Add Income")
        self.add_income_button.setIcon(QIcon(r"..\appData\income_icon"))
        self.add_income_button.clicked.connect(self.add_income)
        self.add_income_button.setToolTip("Add monthly income.")
        self.hori_layout.addWidget(self.add_income_button, Qt.AlignCenter)

        # creating buttons
        self.add_expense_button = QPushButton("Add Expense")
        self.add_expense_button.setIcon(QIcon(r"..\appData\expense_icon"))
        self.add_expense_button.clicked.connect(self.add_expense)
        self.add_expense_button.setToolTip("Add monthly expense.")
        self.hori_layout.addWidget(self.add_expense_button, Qt.AlignCenter)
        self.change_ui()

    def change_ui(self):
        # changing window and widgets colors
        self.main_widget.setStyleSheet("QPushButton:hover {background-color: %s}" % self.settings["button hover color"])
        self.setStyleSheet("QPushButton {background-color: %s}" % self.settings["button color"])
        qp = QWidget.palette(self.main_widget)
        qp.setColor(QPalette.Window, QColor(self.settings["background color"]))
        # qp.setColor(QPalette.Button, QColor(self.settings["button color"]))
        self.setPalette(qp)

    def browse_file(self):
        file_name = QFileDialog.getOpenFileName(self, "select file", r"..\data")

    def save_file(self):
        pass

    def exit_app(self):
        self.close()

    def add_expense(self):
        pass

    def add_income(self):
        pass

    def closeEvent(self, event):
        if self.settings["exit message"]:
            exit_msg = "Do you want to exit the program?"
            reply = QMessageBox.question(self, 'Message', exit_msg, QMessageBox.Yes, QMessageBox.No)

            if reply == QMessageBox.Yes:
                event.accept()
            else:
                event.ignore()
        else:
            event.accept()

    def change_settings(self):
        self.settings_window = SettingsWindow(self)
        self.settings_window.show()

    def display(self, item):
        self.logger.insertPlainText(item + " selected\n")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    sys._excepthook = sys.excepthook  # save original excepthook
    sys.excepthook = exception_hook  # overwrite default excepthook
    app.setStyle("Fusion")
    window = MainWindow()
    window.show()
    app.exec_()